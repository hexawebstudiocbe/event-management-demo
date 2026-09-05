const fs = require('fs');
const path = require('path');

const dir = 'd:/Varun/event demo';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add ?v=3 to all css and js files to forcefully bust cache
    content = content.replace(/href="css\/(.*?\.css)(\?v=\d+)?"/g, 'href="css/$1?v=4"');
    content = content.replace(/src="js\/(.*?\.js)(\?v=\d+)?"/g, 'src="js/$1?v=4"');
    
    fs.writeFileSync(filePath, content);
});
console.log('Aggressive cache busting applied to HTML files.');
