
$folder = "src"

function Update-Colors {
    param ($path)
    $content = Get-Content -LiteralPath $path -Raw
    $originalContent = $content

    # Regex Replacements
    
    # Rose/Orange Light -> Secondary
    $content = $content -replace '(bg|text|border|ring|shadow|from|to|decoration)-(rose|orange)-(50|100|200)', '$1-secondary'
    
    # Rose/Orange Mid/Dark -> Primary
    $content = $content -replace '(bg|text|border|ring|shadow|from|to|decoration)-(rose|orange)-(300|400|500|600|700|800|900|950)', '$1-primary'
    
    # Slate Light -> Muted
    $content = $content -replace '(bg|text|border|ring|shadow|from|to|decoration)-slate-(50|100|200)', '$1-muted'
    
    # Slate Mid -> Muted Foreground
    $content = $content -replace '(bg|text|border|ring|shadow|from|to|decoration)-slate-(300|400|500|600)', '$1-muted-foreground'
    
    # Slate Dark -> Foreground (Text) / Card (Bg)
    $content = $content -replace 'text-slate-(700|800|900|950)', 'text-foreground'
    $content = $content -replace 'bg-slate-(700|800|900|950)', 'bg-card'
    $content = $content -replace 'border-slate-(700|800|900|950)', 'border-border'
    
    # Remove opacity modifiers from migration targets if they double up (simple cleanup)
    # e.g. text-rose-500/20 -> text-primary/20 (Regex preserves suffix, perfect)

    if ($content -ne $originalContent) {
        Set-Content -LiteralPath $path -Value $content -NoNewline
        Write-Host "Updated: $path"
    }
}

Get-ChildItem -Path $folder -Recurse -Include *.tsx, *.ts | ForEach-Object {
    Update-Colors -Path $_.FullName
}
