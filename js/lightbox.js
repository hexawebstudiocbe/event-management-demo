/* lightbox.js */
document.addEventListener('DOMContentLoaded', () => {
    const lightboxElements = document.querySelectorAll('[data-lightbox]');
    if (lightboxElements.length === 0) return;

    // Create lightbox HTML
    const lightboxHTML = `
        <div id="lightbox" class="lightbox-overlay d-none">
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="" alt="Lightbox Image" class="lightbox-img">
                <div class="lightbox-caption"></div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');

    // Add styles dynamically or assume they exist in style.css
    
    lightboxElements.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = item.getAttribute('href') || item.getAttribute('data-src');
            const caption = item.getAttribute('data-caption') || '';
            
            if (imgSrc) {
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = caption;
                lightbox.classList.remove('d-none');
                lightbox.classList.add('lightbox-open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeLightbox = () => {
        lightbox.classList.add('d-none');
        lightbox.classList.remove('lightbox-open');
        document.body.style.overflow = '';
        setTimeout(() => { lightboxImg.src = ''; }, 300);
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('d-none')) {
            closeLightbox();
        }
    });
});
