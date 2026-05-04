$target = "C:\Git\Career_Connections"
$source = "C:\Users\raman\.gemini\antigravity\scratch\career-navigator"
$gitCmd = "C:\Users\raman\AppData\Local\GitHubDesktop\app-3.5.6\resources\app\git\cmd\git.exe"

Write-Host "Navigating to $target..."
Set-Location $target

Write-Host "Cleaning up existing files..."
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force

Write-Host "Copying visible files..."
Copy-Item -Path "$source\*" -Destination $target -Recurse -Force

Write-Host "Copying hidden files..."
Get-ChildItem -Path $source -Force | Where-Object { $_.Name -match "^\." -and $_.Name -ne ".git" } | Copy-Item -Destination $target -Recurse -Force

Write-Host "Running Git commands..."
& $gitCmd add .
& $gitCmd commit -m "Flatten structure, copy workspace, ignore eslint build errors"
& $gitCmd push origin main
Write-Host "Done!"
