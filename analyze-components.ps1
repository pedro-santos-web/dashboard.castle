# Analyze UI Component Usage Script
# This script analyzes the usage of UI components in a project.
#
# Get all UI component files
$uiComponents = Get-ChildItem "resources\js\components\ui\*.tsx" | ForEach-Object { [System.IO.Path]::GetFileNameWithoutExtension($_.Name) }

# Search for usage of each component
$usedComponents = @()
$unusedComponents = @()

foreach ($component in $uiComponents) {
    $usage = Select-String -Path "resources\js\**\*.tsx" -Pattern "import.*.*from.*@/components/ui" -Recurse
    if ($usage) {
        $usedComponents += $component
        Write-Host "✓ $component is USED" -ForegroundColor Green
    } else {
        $unusedComponents += $component
        Write-Host "✗ $component is UNUSED" -ForegroundColor Red
    }
}

Write-Host "
=== SUMMARY ===" -ForegroundColor Yellow
Write-Host "Used components ($($usedComponents.Count)): $($usedComponents -join ', ')" -ForegroundColor Green
Write-Host "Unused components ($($unusedComponents.Count)): $($unusedComponents -join ', ')" -ForegroundColor Red
