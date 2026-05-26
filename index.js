function resizeMasonry() {
    const container = document.getElementById('masonry');
    const items = container.querySelectorAll('.item');

    if (items.length === 0) return;

    const gap = 16;

    const itemWidth = items[0].getBoundingClientRect().width;

    const containerWidth = container.offsetWidth;

    const columnsCount =
        Math.floor((containerWidth + gap) / (itemWidth + gap)) || 1;

    const columnTops = Array(columnsCount).fill(0);

    items.forEach(item => {
        const shortestColumnIndex =
            columnTops.indexOf(Math.min(...columnTops));

        const left =
            shortestColumnIndex * (itemWidth + gap);

        const top =
            columnTops[shortestColumnIndex];

        item.style.left = `${left}px`;
        item.style.top = `${top}px`;

        columnTops[shortestColumnIndex] +=
            item.offsetHeight + gap;
    });

    container.style.height =
        `${Math.max(...columnTops)}px`;
}

// WAIT FOR ALL IMAGES
function waitForImages(callback) {

    const images =
        document.querySelectorAll('.item img');

    let loaded = 0;

    if (images.length === 0) {
        callback();
        return;
    }

    function done() {

        loaded++;

        if (loaded === images.length) {
            callback();
        }
    }

    images.forEach(img => {

        if (img.complete) {

            done();

        } else {

            img.addEventListener('load', done);

            // IMPORTANT:
            img.addEventListener('error', done);

        }

    });
}

// TYPEWRITER
const text = "Red.";
const typingElement =
    document.getElementById("typing-text");

let index = 0;

function typeText(callback) {

    if (index < text.length) {

        typingElement.textContent += text[index];

        index++;

        setTimeout(() => {
            typeText(callback);
        }, 120);

    } else {

        callback();

    }
}

// REVEAL IMAGES
function revealImages() {

    const items =
        [...document.querySelectorAll('.item')];

    items.sort((a, b) => a.offsetTop - b.offsetTop);

    items.forEach((item, i) => {

        setTimeout(() => {
            item.classList.add('visible');
        }, i * 100);

    });
}

window.addEventListener('load', () => {

    waitForImages(() => {

        resizeMasonry();

        typeText(() => {

            setTimeout(() => {
                revealImages();
            }, 300);

        });

    });

});

window.addEventListener('resize', resizeMasonry);