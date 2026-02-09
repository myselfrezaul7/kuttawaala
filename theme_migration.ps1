
$folder = "src"
$replacements = @{
    # Rose (Primary Brand Color) -> Primary
    "bg-rose-500"           = "bg-primary"
    "bg-rose-600"           = "bg-primary/90"
    "text-rose-500"         = "text-primary"
    "text-rose-600"         = "text-primary"
    "border-rose-500"       = "border-primary"
    "ring-rose-500"         = "ring-primary"
    
    # Rose Light variants -> Secondary/Muted
    "bg-rose-50"            = "bg-secondary/50"
    "bg-rose-100"           = "bg-secondary"
    "text-rose-400"         = "text-primary/80"
    "border-rose-100"       = "border-border"
    "border-rose-200"       = "border-border"

    # Orange (Secondary/Accent) -> Primary/Accent
    "bg-orange-500"         = "bg-primary"
    "text-orange-500"       = "text-primary"
    "text-orange-600"       = "text-primary"
    "bg-orange-50"          = "bg-secondary/50"
    "border-orange-100"     = "border-border"
    "focus:ring-orange-500" = "focus:ring-primary"

    # Slate (Neutrals) -> Foreground/Muted
    "text-slate-900"        = "text-foreground"
    "text-slate-800"        = "text-foreground"
    "text-slate-700"        = "text-foreground/90"
    "text-slate-600"        = "text-muted-foreground"
    "text-slate-500"        = "text-muted-foreground"
    "text-slate-400"        = "text-muted-foreground/80"
    
    "bg-slate-50"           = "bg-muted/30"
    "bg-slate-100"          = "bg-muted"
    "bg-slate-200"          = "bg-muted"
    "bg-slate-900"          = "bg-card" # Dark mode backgrounds often map to card/popover

    "border-slate-100"      = "border-border/50"
    "border-slate-200"      = "border-border"
    "border-slate-300"      = "border-border"
    
    # Specifics
    "from-rose-500"         = "from-primary"
    "to-rose-600"           = "to-primary/90"
    "to-rose-100"           = "to-secondary"
}

function Update-Colors {
    param ($path)
    $content = Get-Content -LiteralPath $path -Raw
    $originalContent = $content
    
    foreach ($key in $replacements.Keys) {
        # Escape for regex
        $pattern = [Regex]::Escape($key)
        $content = $content -replace $pattern, $replacements[$key]
    }

    if ($content -ne $originalContent) {
        Set-Content -LiteralPath $path -Value $content -NoNewline
        Write-Host "Updated: $path"
    }
}

Get-ChildItem -Path $folder -Recurse -Include *.tsx, *.ts | ForEach-Object {
    Update-Colors -Path $_.FullName
}
