import glob
import os

html_dir = 'frontend/html'

# Find all HTML files
for file in glob.glob(f'{html_dir}/*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace CSS paths
    # We will just replace exactly what they have with the correct relative path
    content = content.replace('href="style.css?v=2"', 'href="../css/style.css?v=3"')
    content = content.replace('href="dashboard.css?v=2"', 'href="../css/dashboard.css?v=3"')
    
    # Just in case some have no cache buster
    content = content.replace('href="style.css"', 'href="../css/style.css?v=3"')
    content = content.replace('href="dashboard.css"', 'href="../css/dashboard.css?v=3"')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("CSS links fixed in all HTML files.")
