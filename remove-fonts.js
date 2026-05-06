const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('layout.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Match fontFamily: '...' or fontFamily: "..." or fontFamily: '"..."' or fontFamily: "'...'" 
      // with or without trailing commas and spaces.
      
      let newContent = content.replace(/,\s*fontFamily:\s*['"][^'"]+['"]/g, '');
      newContent = newContent.replace(/fontFamily:\s*['"][^'"]+['"]\s*,?/g, '');
      
      // Also catch nested ones like fontFamily: "'Outfit', 'Inter', sans-serif"
      // The previous regex won't match if there are commas inside the string.
      // So let's use a simpler regex that matches up to the next curly brace or comma in the JS object style context.
      // e.g., fontFamily: "'Outfit', 'Inter', sans-serif"
      
      newContent = newContent.replace(/,\s*fontFamily:\s*[^,}]+(?=\s*[}])/g, '');
      newContent = newContent.replace(/fontFamily:\s*[^,}]+(?=\s*[}])/g, '');
      newContent = newContent.replace(/fontFamily:\s*[^}]*?sans-serif['"]\s*,?\s*/g, '');
      newContent = newContent.replace(/,\s*fontFamily:\s*[^}]*?sans-serif['"]/g, '');
      newContent = newContent.replace(/fontFamily:\s*'inherit'\s*,?\s*/g, '');

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Updated ' + fullPath);
      }
    }
  });
}

walk('./src');
