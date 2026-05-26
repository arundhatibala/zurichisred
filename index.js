// MASONRY
function resizeMasonry() {
    const container = document.getElementById('masonry');
    const items = container.querySelectorAll('.item');
    if (items.length === 0) return;
    const gap = 16;
    const itemWidth = items[0].getBoundingClientRect().width;
    const containerWidth = container.offsetWidth;
    const columnsCount = Math.floor((containerWidth + gap) / (itemWidth + gap)) || 1;
    const columnTops = Array(columnsCount).fill(0);
    items.forEach(item => {
        const shortestColumnIndex = columnTops.indexOf(Math.min(...columnTops));
        item.style.left = `${shortestColumnIndex * (itemWidth + gap)}px`;
        item.style.top = `${columnTops[shortestColumnIndex]}px`;
        columnTops[shortestColumnIndex] += item.offsetHeight + gap;
    });
    container.style.height = `${Math.max(...columnTops)}px`;
}

// WAIT FOR ALL IMAGES
function waitForImages(callback) {
    const images = document.querySelectorAll('.item img');
    let loaded = 0;
    if (images.length === 0) {
        callback();
        return;
    }
    function done() {
        loaded++;
        if (loaded === images.length) callback();
    }
    images.forEach(img => {
        if (img.complete) {
            done();
        } else {
            img.addEventListener('load', done);
            img.addEventListener('error', done);
        }
    });
}

// TYPEWRITER
const text = "Red.";
let index = 0;
function typeText(el, callback) {
    if (index < text.length) {
        el.textContent += text[index];
        index++;
        setTimeout(() => typeText(el, callback), 120);
    } else {
        callback();
    }
}

// REVEAL IMAGES
function revealImages() {
    const items = [...document.querySelectorAll('.item')];
    items.sort((a, b) => a.offsetTop - b.offsetTop);
    items.forEach((item, i) => {
        setTimeout(() => item.classList.add('visible'), i * 100);
    });
}

// INIT
window.addEventListener('load', () => {
    const typingElement = document.getElementById('typing-text');
    waitForImages(() => {
        resizeMasonry();
        typeText(typingElement, () => {
            setTimeout(revealImages, 300);
        });
    });
});

window.addEventListener('resize', resizeMasonry);