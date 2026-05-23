import os

def update_file(filename, replacements):
    if not os.path.exists(filename): return
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements.items():
        content = content.replace(old, new)
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

dashboard_replacements = {
    '--bg: #090706;': '--bg: #F4F7FE;',
    '--surface: rgba(255,255,255,0.03);': '--surface: #FFFFFF;',
    '--surface-hover: rgba(255,255,255,0.06);': '--surface-hover: #F1F5F9;',
    '--border: rgba(201,123,54,0.15);': '--border: #E2E8F0;',
    '--border-hover: rgba(244,185,66,0.4);': '--border-hover: #CBD5E1;',
    '--clay: #C97B36;': '--clay: #4318FF;',
    '--clay-light: #e8924a;': '--clay-light: #39B8FF;',
    '--gold: #F4B942;': '--gold: #FFB547;',
    '--gold-glow: rgba(244,185,66,0.25);': '--gold-glow: rgba(255,181,71,0.25);',
    '--clay-glow: rgba(201,123,54,0.25);': '--clay-glow: rgba(67,24,255,0.25);',
    '--cream: #F8F1E7;': '--cream: #FFFFFF;',
    '--text: #f0e6d3;': '--text: #2B3674;',
    '--text-muted: #9a8070;': '--text-muted: #A3AED0;',
    '--text-dim: #6b5a4a;': '--text-dim: #C4C9D5;',
    'background:rgba(10,8,6,0.95)': 'background:#FFFFFF',
    'background:rgba(9,7,6,.9)': 'background:#FFFFFF',
    'background:#0f0c0a': 'background:#FFFFFF',
    'box-shadow:0 0 20px rgba(244,185,66,.08)': 'box-shadow:0 8px 24px rgba(112,144,176,0.12)',
    'linear-gradient(135deg,rgba(201,123,54,.18),rgba(244,185,66,.08))': 'linear-gradient(135deg,rgba(67,24,255,0.08),rgba(67,24,255,0.03))',
    'border:1px solid rgba(244,185,66,.2)': 'border:1px solid rgba(67,24,255,0.15)',
    'background:linear-gradient(135deg,#fff 40%,var(--gold))': 'background:linear-gradient(135deg,var(--text) 40%,var(--clay))',
    '.amb{': '.amb{display:none !important;',
    '.grain{': '.grain{display:none !important;',
    'background:rgba(0,0,0,.6)': 'background:rgba(0,0,0,.2)',
    '--shadow: 0 8px 32px rgba(0,0,0,0.4)': '--shadow: 0 8px 32px rgba(112,144,176,0.12)',
    '--shadow-glow: 0 8px 32px rgba(201,123,54,0.2)': '--shadow-glow: 0 8px 32px rgba(67,24,255,0.12)',
    'border:1px solid rgba(201,123,54,.12)': 'border:1px solid #E2E8F0',
    'background:rgba(201,123,54,.06)': 'background:#F8FAFC',
    'background:rgba(0,0,0,.2)': 'background:#F1F5F9',
    'background:rgba(255,255,255,.05)': 'background:#F8FAFC',
    'background:rgba(255,255,255,.06)': 'background:#E2E8F0',
    'background:rgba(255,255,255,.03)': 'background:#FFFFFF',
    'background:rgba(255,255,255,.04)': 'background:#FFFFFF',
    'background:rgba(255,255,255,.1)': 'background:#E2E8F0'
}

style_replacements = {
    '--bg-dark: #090706;': '--bg-dark: #F4F7FE;',
    '--panel-left-bg: #0e0b09;': '--panel-left-bg: #FFFFFF;',
    '--panel-right-bg: #090706;': '--panel-right-bg: #F8FAFC;',
    '--clay-base: hsl(24, 75%, 48%);': '--clay-base: #4318FF;',
    '--clay-hover: hsl(24, 85%, 58%);': '--clay-hover: #39B8FF;',
    '--clay-glow: hsla(24, 75%, 48%, 0.35);': '--clay-glow: rgba(67,24,255,0.25);',
    '--gold: hsl(45, 100%, 50%);': '--gold: #FFB547;',
    '--gold-glow: hsla(45, 100%, 50%, 0.35);': '--gold-glow: rgba(255,181,71,0.25);',
    '--text-primary: #f5eedc;': '--text-primary: #2B3674;',
    '--text-secondary: #c9b9a6;': '--text-secondary: #A3AED0;',
    '--text-muted: #80705f;': '--text-muted: #C4C9D5;',
    '--border-color: rgba(230, 126, 34, 0.12);': '--border-color: #E2E8F0;',
    '--border-hover: rgba(230, 126, 34, 0.35);': '--border-hover: #CBD5E1;',
    '--input-bg: rgba(18, 14, 12, 0.45);': '--input-bg: #FFFFFF;',
    'background: linear-gradient(135deg, #ffffff 40%, var(--text-secondary) 100%);': 'background: linear-gradient(135deg, #2B3674 40%, #A3AED0 100%);',
    'background: linear-gradient(to right, #ffffff 40%, var(--text-secondary) 100%);': 'background: linear-gradient(to right, #2B3674 40%, #A3AED0 100%);'
}

update_file('dashboard.css', dashboard_replacements)
update_file('style.css', style_replacements)

# Text color replacements #ffffff -> var(--text-primary) or similar, but avoid breaking buttons that need white text.
with open('dashboard.css', 'r', encoding='utf-8') as f:
    d_content = f.read()

# Make all raw #fff dark, except for specific classes
d_content = d_content.replace('color:#fff', 'color:#2B3674')

# Revert button and badges back to white text
d_content = d_content.replace('.btn-primary{background:linear-gradient(135deg,var(--clay),var(--clay-light));color:#2B3674;', '.btn-primary{background:linear-gradient(135deg,var(--clay),var(--clay-light));color:#FFFFFF;')
d_content = d_content.replace('.nav-badge{margin-left:auto;background:var(--clay);color:#2B3674;', '.nav-badge{margin-left:auto;background:var(--clay);color:#FFFFFF;')
d_content = d_content.replace('.fab{position:fixed;bottom:28px;right:28px;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,var(--clay),var(--gold));border:none;color:#2B3674;', '.fab{position:fixed;bottom:28px;right:28px;width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,var(--clay),var(--gold));border:none;color:#FFFFFF;')

with open('dashboard.css', 'w', encoding='utf-8') as f:
    f.write(d_content)

with open('style.css', 'r', encoding='utf-8') as f:
    s_content = f.read()

s_content = s_content.replace('color: #ffffff;', 'color: #2B3674;')
# Fix button submit text color
s_content = s_content.replace('.btn-submit {\\n    width: 100%;\\n    background: linear-gradient(135deg, var(--clay-base) 0%, var(--clay-hover) 100%);\\n    color: #2B3674;', '.btn-submit {\\n    width: 100%;\\n    background: linear-gradient(135deg, var(--clay-base) 0%, var(--clay-hover) 100%);\\n    color: #FFFFFF;')

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(s_content)

print("Python replace done!")
