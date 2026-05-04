import os

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

replacements = [
    ("CAREER COACHING", "CAREER CONNECTIONS"),
    ("Career Coaching", "Career Connections"),
    ("Hertz Career Coaching", "Hertz Career Connections"),
    ("Senior Solution Architect", "Customer Service Rep"),
    ("RPA Solution Architect", "Customer Service Rep"),
    ("Solution Architect", "Customer Service Rep"),
    ("COACHING</span>", "CONNECTIONS</span>")
]

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.json'):
            filepath = os.path.join(root, file)
            replace_in_file(filepath, replacements)
