$ErrorActionPreference = 'Stop'
$projectRoot = 'D:\Personal\Branding\yasser-nasr-website\yasser-portfolio'
$recoveryRoot = 'D:\Personal\Branding\yasser-portfolio-organization-archive-2026-10-24\media-merge-2026-10-24'
$mergePlan = Get-Content -Raw -LiteralPath (Join-Path $projectRoot 'reports\media-merge-2026-10-24\plan.json') | ConvertFrom-Json
if ([IO.Path]::GetFullPath($mergePlan.root) -ne $projectRoot) { throw 'Unexpected merge root' }
function Project-Path([string]$Relative) {
  $absolute = [IO.Path]::GetFullPath((Join-Path $projectRoot $Relative))
  if (-not $absolute.StartsWith($projectRoot + '\public\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Media path outside public' }
  return $absolute
}
function Check-Hash([string]$File, [string]$Hash) {
  if ((Get-FileHash -LiteralPath $File -Algorithm SHA256).Hash.ToLowerInvariant() -ne $Hash) { throw "Hash mismatch: $File" }
}
# Resolve and verify every collision before any moves; never overwrite a file.
foreach ($entry in $mergePlan.moves) {
  $sourcePath = Project-Path $entry.file
  $targetPath = Project-Path $entry.target
  if (-not $targetPath.StartsWith($projectRoot + '\public\projects\')) { throw 'Unexpected canonical target' }
  Check-Hash $sourcePath $entry.sha256
  if ($entry.existing) { Check-Hash $targetPath $entry.existing.sha256 }
  elseif (Test-Path -LiteralPath $targetPath) { throw 'Unexpected new collision' }
  if ($entry.recovery) {
    $recoveryPath = [IO.Path]::GetFullPath($entry.recovery)
    if (-not $recoveryPath.StartsWith($recoveryRoot + '\', [StringComparison]::OrdinalIgnoreCase)) { throw 'Unsafe recovery path' }
    if (Test-Path -LiteralPath $recoveryPath) { throw 'Would overwrite recovery data' }
  }
}
foreach ($entry in $mergePlan.moves) {
  $sourcePath = Project-Path $entry.file
  $targetPath = Project-Path $entry.target
  New-Item -ItemType Directory -Force -Path ([IO.Path]::GetDirectoryName($targetPath)) | Out-Null
  if ($entry.action -eq 'identical') {
    New-Item -ItemType Directory -Force -Path ([IO.Path]::GetDirectoryName($entry.recovery)) | Out-Null
    Move-Item -LiteralPath $sourcePath -Destination $entry.recovery
    Check-Hash $entry.recovery $entry.sha256
  } else {
    if ($entry.action -eq 'conflict') {
      New-Item -ItemType Directory -Force -Path ([IO.Path]::GetDirectoryName($entry.recovery)) | Out-Null
      Move-Item -LiteralPath $targetPath -Destination $entry.recovery
      Check-Hash $entry.recovery $entry.existing.sha256
    }
    if (Test-Path -LiteralPath $targetPath) { throw 'Refusing overwrite' }
    Move-Item -LiteralPath $sourcePath -Destination $targetPath
  }
  Check-Hash $targetPath $entry.sha256
}
# Remove only verified-empty former source directories, never a data-containing tree.
foreach ($folder in @('projects-optimized','videos-optimized')) {
  $sourceRoot = Project-Path ('public\' + $folder)
  if ($sourceRoot -notin @('D:\Personal\Branding\yasser-nasr-website\yasser-portfolio\public\projects-optimized','D:\Personal\Branding\yasser-nasr-website\yasser-portfolio\public\videos-optimized')) { throw 'Unsafe empty-directory scope' }
  $folders = @(Get-ChildItem -LiteralPath $sourceRoot -Directory -Recurse -Force) + @(Get-Item -LiteralPath $sourceRoot)
  foreach ($folderItem in ($folders | Sort-Object { $_.FullName.Length } -Descending)) {
    $checkedPath = [IO.Path]::GetFullPath($folderItem.FullName)
    if ($checkedPath -ne $sourceRoot -and -not $checkedPath.StartsWith($sourceRoot+'\')) { throw 'Directory escaped merge scope' }
    if (@(Get-ChildItem -LiteralPath $checkedPath -Force).Count) { throw "Unexpected file remains: $checkedPath" }
    Remove-Item -LiteralPath $checkedPath -Force
  }
}
[PSCustomObject]@{optimizedFilesVerified=$mergePlan.moves.Count;canonicalFolder='public/projects';originalVersionsArchived=2;identicalCopiesArchived=19} | ConvertTo-Json
