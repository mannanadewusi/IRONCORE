$path = "c:\Users\USER\Documents\Web Design\Landing Pages\ym2\index.html"
$content = Get-Content -Raw -Path $path -Encoding UTF8

$content = $content.Replace('â˜°', '☰')
$content = $content.Replace('ðŸ’ª', '💪')
$content = $content.Replace('ðŸ”¥', '🔥')
$content = $content.Replace('ðŸ ‹ï¸ ', '🏋️')
$content = $content.Replace('â€¢', '•')
$content = $content.Replace('âœ“', '✓')
$content = $content.Replace('âœ—', '✗')
$content = $content.Replace('âœ•', '✕')

$content = $content.Replace('<i>ðŸ“ </i>', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-red); margin-top: 4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>')
$content = $content.Replace('<i>ðŸ“ž</i>', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-red); margin-top: 4px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>')
$content = $content.Replace('<i>âœ‰ï¸ </i>', '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-red); margin-top: 4px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>')

Set-Content -Path $path -Value $content -Encoding UTF8
Write-Host "Replaced all garbled icons and added SVGs."
