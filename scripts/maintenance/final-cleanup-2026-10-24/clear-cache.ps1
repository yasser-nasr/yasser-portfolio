$ErrorActionPreference = 'Stop'
$projectRoot = 'D:\Personal\Branding\yasser-nasr-website\yasser-portfolio'
$cacheTarget = [IO.Path]::GetFullPath((Join-Path $projectRoot '.next'))
if ($cacheTarget -ne 'D:\Personal\Branding\yasser-nasr-website\yasser-portfolio\.next') { throw 'Unsafe cache target' }
$processSnapshot = @(Get-CimInstance Win32_Process)
$mainServers = @($processSnapshot | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -and $_.CommandLine.Contains($projectRoot) -and $_.CommandLine -match '\sdev\s*$' })
if ($mainServers.Count -ne 1) { throw 'Expected exactly one identified portfolio next dev process' }
$serverTree = [Collections.Generic.List[int]]::new()
$serverTree.Add([int]$mainServers[0].ProcessId)
for ($index = 0; $index -lt $serverTree.Count; $index++) {
  foreach ($child in @($processSnapshot | Where-Object { $_.ParentProcessId -eq $serverTree[$index] })) { $serverTree.Add([int]$child.ProcessId) }
}
foreach ($processId in @($serverTree | Sort-Object -Descending)) {
  $currentProcess = Get-CimInstance Win32_Process -Filter "ProcessId=$processId"
  if ($currentProcess -and (-not $currentProcess.CommandLine.Contains($projectRoot))) { throw 'Unexpected child outside the identified app tree' }
}
# User explicitly approved stopping this server tree, clearing .next, and restarting.
foreach ($processId in @($serverTree | Sort-Object -Descending)) {
  if (Get-Process -Id $processId -ErrorAction SilentlyContinue) { Stop-Process -Id $processId -Force }
}
Start-Sleep -Seconds 2
$stillRunning = @(Get-CimInstance Win32_Process | Where-Object { $_.Name -eq 'node.exe' -and $_.CommandLine -and $_.CommandLine.Contains($projectRoot) -and ($_.CommandLine -match 'start-server|\sdev\s*$|\sstart\s*$|\.next[\\/]dev') })
if ($stillRunning.Count) { throw 'An app server or dev worker is still using the cache' }
if (@(Get-NetTCPConnection -State Listen -LocalPort 3000 -ErrorAction SilentlyContinue).Count) { throw 'Port 3000 is still listening' }
$resolvedCache = (Resolve-Path -LiteralPath $cacheTarget).Path
if ($resolvedCache -ne $cacheTarget) { throw 'Cache target resolved unexpectedly' }
if (@(Get-ChildItem -LiteralPath $cacheTarget -Force -Recurse | Where-Object { $_.Attributes -band [IO.FileAttributes]::ReparsePoint }).Count) { throw 'Refusing cache containing reparse points' }
$cacheFiles = @(Get-ChildItem -LiteralPath $cacheTarget -Recurse -Force -File)
$cacheBytes = ($cacheFiles | Measure-Object Length -Sum).Sum
Remove-Item -LiteralPath $cacheTarget -Recurse -Force
$typeCache = [IO.Path]::GetFullPath((Join-Path $projectRoot 'tsconfig.tsbuildinfo'))
$typeCacheBytes = 0
if ($typeCache -ne 'D:\Personal\Branding\yasser-nasr-website\yasser-portfolio\tsconfig.tsbuildinfo') { throw 'Unsafe incremental cache target' }
if (Test-Path -LiteralPath $typeCache) {
  $typeCacheBytes = (Get-Item -LiteralPath $typeCache).Length
  Remove-Item -LiteralPath $typeCache -Force
}
$result = [ordered]@{ stoppedServerPids = @($serverTree); cachePath = $cacheTarget; cacheFilesDeleted = $cacheFiles.Count; cacheBytesDeleted = $cacheBytes; incrementalTypeCacheBytesDeleted = $typeCacheBytes }
$result | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $projectRoot 'reports\organization-2026-10-24\final-cleanup\cache-deletion.json') -Encoding UTF8
$result | ConvertTo-Json -Depth 5
