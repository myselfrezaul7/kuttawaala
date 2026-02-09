
$folder = "src"
# Order matters: Specific/Longer matches first
$replacements = @(
    @{ Pattern = "Catwaala"; Replacement = "Kuttawaala" },
    @{ Pattern = "catwaala"; Replacement = "kuttawaala" },
    @{ Pattern = "CatService"; Replacement = "DogService" },
    @{ Pattern = "\bCats\b"; Replacement = "Dogs" },
    @{ Pattern = "\bcats\b"; Replacement = "dogs" },
    @{ Pattern = "\bCat\b"; Replacement = "Dog" },
    @{ Pattern = "\bcat\b"; Replacement = "dog" },
    @{ Pattern = "\bKitten\b"; Replacement = "Puppy" },
    @{ Pattern = "\bkitten\b"; Replacement = "puppy" },
    @{ Pattern = "\bMeow\b"; Replacement = "Woof" },
    @{ Pattern = "catwaala@gmail.com"; Replacement = "kuttawaala@gmail.com" },
    @{ Pattern = "https://www.catwaala.com"; Replacement = "https://www.kuttawaala.com" },
    @{ Pattern = "woof@kuttawaala.com"; Replacement = "kuttawaala@gmail.com" },
    @{ Pattern = "\+880 1234 567890"; Replacement = "+880 1234 567890" } 
)

# Function to perform regex replacement
function Update-FileContent {
    param ($path)
    # USE LITERALPATH!
    $content = Get-Content -LiteralPath $path -Raw
    $originalContent = $content
    
    foreach ($item in $replacements) {
        $content = $content -creplace $item.Pattern, $item.Replacement
    }

    if ($content -ne $originalContent) {
        Set-Content -LiteralPath $path -Value $content -NoNewline
        Write-Host "Updated Content: $path"
    }
}

# 1. Update Content First
Get-ChildItem -Path $folder -Recurse -File | ForEach-Object {
    Update-FileContent -Path $_.FullName
}

# 2. Rename Files
Get-ChildItem -Path $folder -Recurse | Where-Object { $_.Name -match "Cat|cat" } | ForEach-Object {
    $newName = $_.Name
    if ($newName -cmatch "^Cat") {
        $newName = $newName -creplace "^Cat", "Dog"
    }
    elseif ($newName -cmatch "^cat") {
        $newName = $newName -creplace "^cat", "dog"
    }
    
    if ($newName -ne $_.Name) {
        Rename-Item -LiteralPath $_.FullName -NewName $newName
        Write-Host "Renamed File: $($_.FullName) to $newName"
    }
}
