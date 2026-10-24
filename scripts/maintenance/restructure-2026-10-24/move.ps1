$ErrorActionPreference = 'Stop'
$projectRoot = 'D:\Personal\Branding\yasser-nasr-website\yasser-portfolio'
$planFile = Join-Path $projectRoot 'reports\restructure-2026-10-24\plan.json'
$movePlan = Get-Content -Raw -LiteralPath $planFile | ConvertFrom-Json
if ([IO.Path]::GetFullPath($movePlan.root) -ne $projectRoot) { throw 'Unexpected move root' }
function Checked-Path([string]$Relative) {
  $absolute = [IO.Path]::GetFullPath((Join-Path $projectRoot $Relative))
  if (-not $absolute.StartsWith($projectRoot + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Path outside app' }
  return $absolute
}
foreach ($move in $movePlan.mappings) {
  $sourceFile = Checked-Path $move.from
  $destination = Checked-Path $move.to
  $saved = $movePlan.originals | Where-Object { $_.file -eq $move.from }
  if (-not $saved) { throw 'No checkpoint record' }
  if ((Get-FileHash -LiteralPath $sourceFile -Algorithm SHA256).Hash.ToLowerInvariant() -ne $saved.sha256) { throw 'Source changed since checkpoint' }
  if ((Get-FileHash -LiteralPath $saved.checkpoint -Algorithm SHA256).Hash.ToLowerInvariant() -ne $saved.sha256) { throw 'Checkpoint mismatch' }
  if (Test-Path -LiteralPath $destination) { throw 'Destination exists' }
}
$reportSource = Checked-Path $movePlan.reportMove.from
$reportTarget = Checked-Path $movePlan.reportMove.to
if (Test-Path -LiteralPath $reportTarget) { throw 'Reports destination already exists' }
foreach ($file in $movePlan.reportFiles) {
  if ((Get-FileHash -LiteralPath (Checked-Path $file.file) -Algorithm SHA256).Hash.ToLowerInvariant() -ne $file.sha256) { throw 'Report changed before move' }
}
foreach ($move in $movePlan.mappings) {
  $sourceFile = Checked-Path $move.from
  $destination = Checked-Path $move.to
  New-Item -ItemType Directory -Force -Path ([IO.Path]::GetDirectoryName($destination)) | Out-Null
  Move-Item -LiteralPath $sourceFile -Destination $destination
}
# Exact report folder targets have been resolved and checked above; no data is deleted.
Move-Item -LiteralPath $reportSource -Destination $reportTarget
foreach ($oldDirectory in @('content','docs\generated-assets')) {
  $emptyPath = Checked-Path $oldDirectory
  if ((Test-Path -LiteralPath $emptyPath) -and @(Get-ChildItem -LiteralPath $emptyPath -Force).Count -eq 0) { Remove-Item -LiteralPath $emptyPath }
}
[PSCustomObject]@{fileMoves=$movePlan.mappings.Count;reportFiles=$movePlan.reportFiles.Count;checkpoint=$movePlan.checkpoint;reportFolder=$reportTarget} | ConvertTo-Json
