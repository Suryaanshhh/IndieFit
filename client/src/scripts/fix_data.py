with open(r'c:\Users\Airdit\Desktop\IndieFit\client\src\data\guidesContent.ts', 'r', encoding='utf-8') as f:
    c = f.read()
c = c.replace('â€“', '–').replace('âˆ’', '-').replace('Ã—', 'x')
if 'export const guideContents' not in c:
    c += '\n\nexport const guideContents = guidesContent;\n'
with open(r'c:\Users\Airdit\Desktop\IndieFit\client\src\data\guidesContent.ts', 'w', encoding='utf-8') as f:
    f.write(c)

with open(r'c:\Users\Airdit\Desktop\IndieFit\client\src\data\knowledgeContent.ts', 'r', encoding='utf-8') as f:
    c2 = f.read()
c2 = c2.replace('â€“', '–').replace('âˆ’', '-').replace('Ã—', 'x')
if 'export const knowledgeContents' not in c2:
    c2 += '\n\nexport const knowledgeContents = knowledgeContent;\n'
with open(r'c:\Users\Airdit\Desktop\IndieFit\client\src\data\knowledgeContent.ts', 'w', encoding='utf-8') as f:
    f.write(c2)
print("Finished fixing aliases and encoding.")
