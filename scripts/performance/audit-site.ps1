param(
  [switch]$DiscoverOnly,
  [string]$Analyze,
  [string]$Resume
)
$ErrorActionPreference = 'Stop'
$projectRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../..'))
Push-Location -LiteralPath $projectRoot
try {
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) { throw 'Install Node.js 22.19+ or 24 LTS, then run npm install.' }
  $auditArgs = @('--import', 'tsx', 'scripts/performance/audit-live-site.mjs')
  if ($DiscoverOnly) { $auditArgs += '--discover-only' }
  if ($Analyze) { $auditArgs += @('--analyze', $Analyze) }
  if ($Resume) { $auditArgs += @('--resume', $Resume) }
  & node @auditArgs
  if ($LASTEXITCODE -ne 0) {
    $auditExitCode = $LASTEXITCODE
    [Console]::Error.WriteLine("Audit incomplete (exit $auditExitCode). See the specific error above and the saved ANALYSIS.md/results.json. Existing reports have been preserved.")
    exit $auditExitCode
  }
} finally { Pop-Location }
