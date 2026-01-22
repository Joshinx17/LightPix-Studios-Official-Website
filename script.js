document.addEventListener('DOMContentLoaded', () => {
    
    // TAB SWITCHING
    const tabs = document.querySelectorAll('.nav-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            contents.forEach(c => {
                c.classList.remove('active');
                if (c.id === target) c.classList.add('active');
            });
        });
    });
});

// PDF READER (FROM /books FOLDER)
function openBook(url) {
    const reader = document.getElementById('pdf-reader');
    const frame = document.getElementById('pdf-frame');
    frame.src = url;
    reader.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBook() {
    const reader = document.getElementById('pdf-reader');
    reader.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// LIGHTBOX (FROM /art OR /photography FOLDERS)
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const clickedImgSrc = element.querySelector('img').src;
    
    lightboxImg.src = clickedImgSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}