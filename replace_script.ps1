
$folder = "src"
$replacements = @(
    @{ Find = "Catwaala"; Replace = "Kuttawaala" },
    @{ Find = "catwaala"; Replace = "kuttawaala" },
    @{ Find = "CatService"; Replace = "DogService" },
    @{ Find = "Cats"; Replace = "Dogs" },
    @{ Find = "cats"; Replace = "dogs" },
    @{ Find = "Cat"; Replace = "Dog" },
    @{ Find = "cat"; Replace = "dog" },
    @{ Find = "Kitten"; Replace = "Puppy" },
    @{ Find = "kitten"; Replace = "puppy" },
    @{ Find = "Meow"; Replace = "Woof" },
    @{ Find = "catwaala@gmail.com"; Replace = "kuttawaala@gmail.com" },
    @{ Find = "https://www.catwaala.com"; Replace = "https://www.kuttawaala.com" }
)

# Replace content
Get-ChildItem -Path $folder -Recurse -File | ForEach-Object {
    $content = Get-Content -Path $_.FullName -Raw
    $originalContent = $content
    
    foreach ($item in $replacements) {
        $find = $item.Find
        $replace = $item.Replace
        # Use -creplace for case-sensitive replacement
        $content = $content -creplace $find, $replace
    }

    if ($content -ne $originalContent) {
        Set-Content -Path $_.FullName -Value $content -NoNewline
        Write-Host "Updated Content: $($_.FullName)"
    }
}

# Rename files (if any remaining)
Get-ChildItem -Path $folder -Recurse | Where-Object { $_.Name -like "*Cat*" -or $_.Name -like "*cat*" } | ForEach-Object {
    $newName = $_.Name -creplace "Cat", "Dog" -creplace "cat", "dog"
    if ($newName -ne $_.Name) {
        Rename-Item -Path $_.FullName -NewName $newName
        Write-Host "Renamed File: $($_.FullName) to $newName"
    }
}
