const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsToDownload = [
    { url: 'https://images.unsplash.com/photo-1519167758481-83f59194bb10?w=1920&q=80', dest: 'assets/images/hero/hero-bg.jpg' },
    { url: 'https://images.unsplash.com/photo-1511285560929-80a456fea0a1?w=800&q=80', dest: 'assets/images/hero/about-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80', dest: 'assets/images/hero/about-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', dest: 'assets/images/services/wedding.jpg' },
    { url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80', dest: 'assets/images/services/corporate.jpg' },
    { url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', dest: 'assets/images/services/decoration.jpg' },
    { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', dest: 'assets/images/gallery/wedding-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', dest: 'assets/images/gallery/corporate-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1470229722913-7c090be4abac?w=800&q=80', dest: 'assets/images/gallery/decoration-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', dest: 'assets/images/gallery/wedding-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', dest: 'assets/images/gallery/corporate-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80', dest: 'assets/images/gallery/decoration-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', dest: 'assets/images/team/team-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80', dest: 'assets/images/team/team-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', dest: 'assets/images/team/team-3.jpg' },
    { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80', dest: 'assets/images/testimonials/client-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80', dest: 'assets/images/testimonials/client-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80', dest: 'assets/images/testimonials/client-3.jpg' },
    { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', dest: 'assets/images/blog/blog-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1475721028070-2051152a4cb8?w=800&q=80', dest: 'assets/images/blog/blog-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', dest: 'assets/images/blog/blog-3.jpg' },
    { url: 'https://images.unsplash.com/photo-1519167758481-83f59194bb10?w=1920&q=80', dest: 'assets/images/backgrounds/bg-1.jpg' },
    { url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1920&q=80', dest: 'assets/images/backgrounds/bg-2.jpg' },
    { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80', dest: 'assets/images/backgrounds/bg-3.jpg' },
    { url: 'https://assets.codepen.io/3364143/7btrrd.mp4', dest: 'assets/videos/hero-video.mp4' }
];

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // handle redirect
                download(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

// Generate nice SVGs for clients
const clientNames = ['Marriott', 'Infosys', 'TCS', 'Taj Hotels', 'Cognizant', 'Wipro'];
clientNames.forEach((name, idx) => {
    const svg = `<svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="transparent"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#777777" dominant-baseline="middle" text-anchor="middle">${name}</text>
    </svg>`;
    fs.writeFileSync(path.join(__dirname, `assets/images/clients/client-${idx + 1}.svg`), svg);
});

async function main() {
    console.log('Downloading assets...');
    const promises = assetsToDownload.map(asset => {
        const dir = path.dirname(path.join(__dirname, asset.dest));
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        return download(asset.url, path.join(__dirname, asset.dest));
    });
    
    try {
        await Promise.all(promises);
        console.log('All assets downloaded successfully!');
    } catch (err) {
        console.error('Error downloading assets:', err);
    }
}

main();
