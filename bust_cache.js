const fs = require('fs');
const path = require('path');

const dir = 'd:/Varun/event demo';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace css/style.css with css/style.css?v=2 (only if it doesn't already have a query param)
    content = content.replace(/href="css\/(.*?\.css)"/g, 'href="css/$1?v=2"');
    
    fs.writeFileSync(filePath, content);
});
console.log('Cache busting appended to HTML files.');
