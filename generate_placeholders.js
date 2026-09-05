const fs = require('fs');
const path = require('path');

const dirs = [
    'assets/images/hero',
    'assets/images/services',
    'assets/images/gallery',
    'assets/images/team',
    'assets/images/testimonials',
    'assets/images/clients',
    'assets/images/blog',
    'assets/images/backgrounds',
];

const svgTemplate = (width, height, text, bgColor) => `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}" />
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" dominant-baseline="middle" text-anchor="middle">${text}</text>
</svg>
`;

dirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
    
    // Create 1-3 placeholders per directory depending on category
    for (let i = 1; i <= 3; i++) {
        const category = path.basename(dir);
        let width = 800;
        let height = 600;
        
        if (category === 'hero') { width = 1920; height = 1080; }
        else if (category === 'clients') { width = 200; height = 100; }
        else if (category === 'team') { width = 400; height = 400; }
        else if (category === 'testimonials') { width = 100; height = 100; }
        
        const bgColor = category === 'hero' ? '#1b1b1b' : '#c89b3c';
        
        const svgContent = svgTemplate(width, height, `${category} ${i}`, bgColor);
        fs.writeFileSync(path.join(fullPath, `placeholder-${i}.svg`), svgContent.trim());
    }
});

console.log('Placeholder SVGs created successfully.');
