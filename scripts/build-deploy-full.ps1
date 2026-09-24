$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$standaloneDir = Join-Path $projectRoot ".next\standalone"
$publicDir = Join-Path $projectRoot "public"
$staticDir = Join-Path $projectRoot ".next\static"
$standalonePublicDir = Join-Path $standaloneDir "public"
$standaloneStaticDir = Join-Path $standaloneDir ".next\static"
$outputDir = Join-Path $projectRoot "output"
$archivePath = Join-Path $outputDir "deploy-standalone-full.zip"

Push-Location $projectRoot
try {
    Write-Host "Building the Next.js application..."
    & npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Next.js build failed with exit code $LASTEXITCODE."
    }

    if (-not (Test-Path -LiteralPath $standaloneDir -PathType Container)) {
        throw "Standalone output was not created: $standaloneDir"
    }

    if (Test-Path -LiteralPath $publicDir -PathType Container) {
        New-Item -ItemType Directory -Path $standalonePublicDir -Force | Out-Null
        Get-ChildItem -LiteralPath $publicDir -Force | Copy-Item -Destination $standalonePublicDir -Recurse -Force
    }

    if (-not (Test-Path -LiteralPath $staticDir -PathType Container)) {
        throw "Next.js static output was not created: $staticDir"
    }

    New-Item -ItemType Directory -Path $standaloneStaticDir -Force | Out-Null
    Get-ChildItem -LiteralPath $staticDir -Force | Copy-Item -Destination $standaloneStaticDir -Recurse -Force

    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    if (Test-Path -LiteralPath $archivePath) {
        Remove-Item -LiteralPath $archivePath -Force
    }

    $archiveItems = @(Get-ChildItem -LiteralPath $standaloneDir -Force)
    if ($archiveItems.Count -eq 0) {
        throw "Standalone output is empty: $standaloneDir"
    }

    Write-Host "Creating a full deployment archive..."
    & tar.exe -a -c -f $archivePath -C $standaloneDir .
    if ($LASTEXITCODE -ne 0) {
        throw "Archive creation failed with exit code $LASTEXITCODE."
    }
    Write-Host "Archive created: $archivePath"
}
finally {
    Pop-Location
}
