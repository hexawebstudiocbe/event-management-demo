const fs = require('fs');
const path = require('path');

const replacements = [
    // index.html Hero
    [/<img src="assets\/images\/hero\/placeholder-1\.svg" class="hero-video-bg" alt="Hero Background">/, '<video class="hero-video-bg" autoplay loop muted playsinline>\n            <source src="assets/videos/hero-video.mp4" type="video/mp4">\n            <img src="assets/images/hero/hero-bg.jpg" alt="Hero Background">\n        </video>'],
    
    // Clients SVG
    [/"assets\/images\/clients\/placeholder-1\.svg"/g, '"assets/images/clients/client-1.svg"'],
    [/"assets\/images\/clients\/placeholder-2\.svg"/g, '"assets/images/clients/client-2.svg"'],
    [/"assets\/images\/clients\/placeholder-3\.svg"/g, '"assets/images/clients/client-3.svg"'],
    // Handle the duplicated clients in slider
    [/"assets\/images\/clients\/placeholder-1\.svg"/g, '"assets/images/clients/client-4.svg"'],
    [/"assets\/images\/clients\/placeholder-2\.svg"/g, '"assets/images/clients/client-5.svg"'],
    
    // index.html About
    [/"assets\/images\/hero\/placeholder-2\.svg"/g, '"assets/images/hero/about-1.jpg"'],
    [/"assets\/images\/hero\/placeholder-3\.svg"/g, '"assets/images/hero/about-2.jpg"'],
    
    // Backgrounds
    [/"assets\/images\/backgrounds\/placeholder-1\.svg"/g, '"assets/images/backgrounds/bg-1.jpg"'],
    [/"assets\/images\/backgrounds\/placeholder-2\.svg"/g, '"assets/images/backgrounds/bg-2.jpg"'],
    [/"assets\/images\/backgrounds\/placeholder-3\.svg"/g, '"assets/images/backgrounds/bg-3.jpg"'],

    // Services
    [/"assets\/images\/services\/placeholder-1\.svg"/g, '"assets/images/services/wedding.jpg"'],
    [/"assets\/images\/services\/placeholder-2\.svg"/g, '"assets/images/services/corporate.jpg"'],
    [/"assets\/images\/services\/placeholder-3\.svg"/g, '"assets/images/services/decoration.jpg"'],
    
    // Gallery
    [/"assets\/images\/gallery\/placeholder-1\.svg"/g, '"assets/images/gallery/wedding-1.jpg"'],
    [/"assets\/images\/gallery\/placeholder-2\.svg"/g, '"assets/images/gallery/corporate-1.jpg"'],
    [/"assets\/images\/gallery\/placeholder-3\.svg"/g, '"assets/images/gallery/decoration-1.jpg"'],
    // Some are repeated in gallery.html, let's fix that manually by string replace instead of global if needed, or let them map to -1.
    
    // Team
    [/"assets\/images\/team\/placeholder-1\.svg"/g, '"assets/images/team/team-1.jpg"'],
    [/"assets\/images\/team\/placeholder-2\.svg"/g, '"assets/images/team/team-2.jpg"'],
    [/"assets\/images\/team\/placeholder-3\.svg"/g, '"assets/images/team/team-3.jpg"'],

    // Testimonials
    [/"assets\/images\/testimonials\/placeholder-1\.svg"/g, '"assets/images/testimonials/client-1.jpg"'],
    [/"assets\/images\/testimonials\/placeholder-2\.svg"/g, '"assets/images/testimonials/client-2.jpg"'],
    [/"assets\/images\/testimonials\/placeholder-3\.svg"/g, '"assets/images/testimonials/client-3.jpg"'],

    // Blog
    [/"assets\/images\/blog\/placeholder-1\.svg"/g, '"assets/images/blog/blog-1.jpg"'],
    [/"assets\/images\/blog\/placeholder-2\.svg"/g, '"assets/images/blog/blog-2.jpg"'],
    [/"assets\/images\/blog\/placeholder-3\.svg"/g, '"assets/images/blog/blog-3.jpg"']
];

const filesToUpdate = [
    'index.html',
    'about.html',
    'services.html',
    'portfolio.html',
    'gallery.html',
    'packages.html',
    'blog.html',
    'contact.html'
];

filesToUpdate.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        replacements.forEach(([regex, replacement]) => {
            content = content.replace(regex, replacement);
        });

        // specific gallery fix for items 4,5,6
        let i = 0;
        content = content.replace(/"assets\/images\/gallery\/wedding-1\.jpg"/g, match => {
            i++;
            if (i > 2) return '"assets/images/gallery/wedding-2.jpg"'; // href and src
            return match;
        });

        i = 0;
        content = content.replace(/"assets\/images\/gallery\/corporate-1\.jpg"/g, match => {
            i++;
            if (i > 2) return '"assets/images/gallery/corporate-2.jpg"'; 
            return match;
        });

        i = 0;
        content = content.replace(/"assets\/images\/gallery\/decoration-1\.jpg"/g, match => {
            i++;
            if (i > 2) return '"assets/images/gallery/decoration-2.jpg"'; 
            return match;
        });

        fs.writeFileSync(filePath, content);
    }
});

console.log('HTML files updated successfully.');
