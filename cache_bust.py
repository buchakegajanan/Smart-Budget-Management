import glob

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple cache busting
    content = content.replace('href="dashboard.css"', 'href="dashboard.css?v=2"')
    content = content.replace('href="style.css"', 'href="style.css?v=2"')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print('Cache busting applied.')
