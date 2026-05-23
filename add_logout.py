import glob

logout_html = '''    <a href="index.html" class="nav-item" style="color: #f87171; margin-top: auto;" onclick="localStorage.clear()"><span class="nav-icon">🚪</span><span class="nav-label">Logout</span></a>
  </nav>'''

for file in glob.glob('*.html'):
    if file == 'index.html': continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'Logout' not in content:
        content = content.replace('  </nav>', logout_html)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

print('Logout buttons added.')
