param([Parameter(Mandatory=$true)][string]$PlanPath)
$ErrorActionPreference = 'Stop'
$organizationPlan = Get-Content -Raw -LiteralPath $PlanPath | ConvertFrom-Json
$projectRoot = [IO.Path]::GetFullPath($organizationPlan.root).TrimEnd('\')
$archiveRoot = [IO.Path]::GetFullPath($organizationPlan.archiveRoot).TrimEnd('\')
if ($projectRoot -ne 'D:\Personal\Branding\yasser-nasr-website\yasser-portfolio') { throw 'Unexpected project root' }
if ($archiveRoot -ne 'D:\Personal\Branding\yasser-portfolio-organization-archive-2026-10-24') { throw 'Unexpected archive root' }
if (Test-Path -LiteralPath $archiveRoot) { throw 'Archive already exists; refusing to overwrite' }
function Assert-Within([string]$Candidate, [string]$AllowedRoot) {
  $resolvedPath = [IO.Path]::GetFullPath($Candidate)
  if (-not $resolvedPath.StartsWith($AllowedRoot + '\', [StringComparison]::OrdinalIgnoreCase)) { throw "Unsafe path: $resolvedPath" }
  return $resolvedPath
}
function Assert-Hash([string]$File, [string]$Expected) {
  if ((Get-FileHash -LiteralPath $File -Algorithm SHA256).Hash.ToLowerInvariant() -ne $Expected) { throw "Hash mismatch: $File" }
}
function Copy-Verified([string]$Source, [string]$Destination, [string]$Expected) {
  if (Test-Path -LiteralPath $Destination) { throw "Would overwrite: $Destination" }
  Assert-Hash $Source $Expected
  New-Item -ItemType Directory -Force -Path ([IO.Path]::GetDirectoryName($Destination)) | Out-Null
  Copy-Item -LiteralPath $Source -Destination $Destination
  Assert-Hash $Destination $Expected
}
# Validate every final absolute target before making changes.
foreach ($entry in $organizationPlan.trackedArchives) {
  $sourcePath = Assert-Within (Join-Path $projectRoot $entry.file) $projectRoot
  $archivePath = Assert-Within (Join-Path $archiveRoot ('source-artwork\' + $entry.file)) $archiveRoot
  Assert-Hash $sourcePath $entry.sha256
  & git -C $projectRoot ls-files --error-unmatch -- $entry.file *> $null
  if ($LASTEXITCODE -ne 0) { throw "Refusing to delete untracked file: $sourcePath" }
}
foreach ($move in $organizationPlan.moves) {
  $sourcePath = Assert-Within (Join-Path $projectRoot $move.from) $projectRoot
  $allowedTarget = if ($move.external) { $archiveRoot } else { $projectRoot }
  $targetPath = Assert-Within (Join-Path $allowedTarget $move.to) $allowedTarget
  if (-not (Test-Path -LiteralPath $sourcePath)) { throw "Missing source: $sourcePath" }
  if (Test-Path -LiteralPath $targetPath) { throw "Would overwrite move target: $targetPath" }
  foreach ($file in $move.files) { Assert-Hash (Join-Path $projectRoot $file.file) $file.sha256 }
}
New-Item -ItemType Directory -Path $archiveRoot | Out-Null
Copy-Item -LiteralPath $PlanPath -Destination (Join-Path $archiveRoot 'recovery-plan.json')
# Copy and verify all recovery material first, including untracked reports/tools.
foreach ($entry in $organizationPlan.trackedArchives) {
  $sourcePath = Join-Path $projectRoot $entry.file
  $archivePath = Assert-Within (Join-Path $archiveRoot ('source-artwork\' + $entry.file)) $archiveRoot
  Copy-Verified $sourcePath $archivePath $entry.sha256
}
foreach ($move in $organizationPlan.moves) {
  foreach ($file in $move.files) {
    $sourcePath = Join-Path $projectRoot $file.file
    $archivePath = Assert-Within (Join-Path $archiveRoot ('recovery-copies\' + $file.file)) $archiveRoot
    Copy-Verified $sourcePath $archivePath $file.sha256
  }
}
# Only tracked, verified source artwork is deleted. Untracked material is moved, never deleted.
foreach ($entry in $organizationPlan.trackedArchives) {
  $sourcePath = Assert-Within (Join-Path $projectRoot $entry.file) $projectRoot
  Assert-Hash $sourcePath $entry.sha256
  Assert-Hash (Join-Path $archiveRoot ('source-artwork\' + $entry.file)) $entry.sha256
  Remove-Item -LiteralPath $sourcePath -Force
}
foreach ($move in $organizationPlan.moves) {
  $sourcePath = Assert-Within (Join-Path $projectRoot $move.from) $projectRoot
  $allowedTarget = if ($move.external) { $archiveRoot } else { $projectRoot }
  $targetPath = Assert-Within (Join-Path $allowedTarget $move.to) $allowedTarget
  New-Item -ItemType Directory -Force -Path ([IO.Path]::GetDirectoryName($targetPath)) | Out-Null
  Move-Item -LiteralPath $sourcePath -Destination $targetPath
  foreach ($file in $move.files) {
    $relativeSuffix = $file.file.Substring($move.from.Length).TrimStart('/')
    $newFile = if ($relativeSuffix) { Join-Path $targetPath $relativeSuffix } else { $targetPath }
    Assert-Hash $newFile $file.sha256
  }
}
$removedEmptyDirectories = [Collections.Generic.List[string]]::new()
foreach ($scope in @('public\projects','docs\case-studies\assets','src\app\work')) {
  $scopePath = Assert-Within (Join-Path $projectRoot $scope) $projectRoot
  if (-not (Test-Path -LiteralPath $scopePath)) { continue }
  $candidates = @(Get-ChildItem -LiteralPath $scopePath -Directory -Recurse -Force) + @(Get-Item -LiteralPath $scopePath)
  foreach ($candidate in ($candidates | Sort-Object { $_.FullName.Length } -Descending)) {
    $checkedPath = Assert-Within $candidate.FullName $projectRoot
    if ($checkedPath -eq (Join-Path $projectRoot 'public\projects') -or $checkedPath -eq (Join-Path $projectRoot 'src\app\work')) { continue }
    if ($candidate.Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Refusing reparse point' }
    if (@(Get-ChildItem -LiteralPath $checkedPath -Force).Count -eq 0) {
      Remove-Item -LiteralPath $checkedPath -Force
      $removedEmptyDirectories.Add($checkedPath.Substring($projectRoot.Length + 1))
    }
  }
}
$result = [ordered]@{
  archiveRoot = $archiveRoot
  archivedTrackedFiles = $organizationPlan.trackedArchives.Count
  archivedTrackedBytes = ($organizationPlan.trackedArchives | Measure-Object bytes -Sum).Sum
  movedGroups = $organizationPlan.moves.Count
  movedFiles = ($organizationPlan.moves.files | Measure-Object).Count
  removedEmptyDirectories = @($removedEmptyDirectories)
}
$result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $projectRoot 'reports\organization-2026-10-24\operations.json') -Encoding UTF8
$result | ConvertTo-Json -Depth 8
