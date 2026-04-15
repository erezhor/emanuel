// Mobile Navigation Dropdown
const menuTrigger = document.getElementById('menuTrigger');
const navMenu = document.getElementById('navMenu');
const menuClose = document.getElementById('menuClose');

if (menuTrigger && navMenu) {
    menuTrigger.addEventListener('click', () => {
        navMenu.classList.add('active'); // Explicit open
    });

    if (menuClose) {
        menuClose.addEventListener('click', () => {
            navMenu.classList.remove('active'); // Explicit close
        });
    }

    // Close menu when tapping a link (important for single page apps/anchors)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Accessibility Widget
const accToggle = document.getElementById('accToggle');
const accMenu = document.getElementById('accMenu');
const btnContrast = document.getElementById('accContrast');
const btnTextPlus = document.getElementById('accTextPlus');
const btnTextMinus = document.getElementById('accTextMinus');

accToggle.addEventListener('click', () => {
    accMenu.classList.toggle('show');
});

btnContrast.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'high-contrast' ? '' : 'high-contrast';
});

btnTextPlus.addEventListener('click', () => {
    document.documentElement.classList.remove('text-minus');
    document.documentElement.classList.add('text-plus');
});

btnTextMinus.addEventListener('click', () => {
    document.documentElement.classList.remove('text-plus');
    document.documentElement.classList.add('text-minus');
});

// Infinite carousel auto-scroll with manual override
const carouselWrapper = document.querySelector('.carousel-wrapper');
if (carouselWrapper) {
    let scrollPos = 0;
    let isUserInteracting = false;

    // Pause auto-sliding on interaction
    carouselWrapper.addEventListener('mouseenter', () => isUserInteracting = true);
    carouselWrapper.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        scrollPos = carouselWrapper.scrollLeft; // Re-sync seamlessly
    });
    
    carouselWrapper.addEventListener('touchstart', () => isUserInteracting = true, {passive: true});
    carouselWrapper.addEventListener('touchend', () => {
        setTimeout(() => {
            isUserInteracting = false;
            scrollPos = carouselWrapper.scrollLeft;
        }, 800);
    });

    // Detect if user scrolls wheel/touchpad within the wrapper
    carouselWrapper.addEventListener('wheel', () => {
        isUserInteracting = true;
        clearTimeout(carouselWrapper.scrollTimeout);
        carouselWrapper.scrollTimeout = setTimeout(() => {
            isUserInteracting = false;
            scrollPos = carouselWrapper.scrollLeft;
        }, 500);
    }, {passive: true});

    function autoScroll() {
        if (!isUserInteracting) {
            scrollPos += 0.5; // Slow, pleasant left-to-right panning
            
            // Seamless infinite loop (Since track has exactly two identical halves)
            if (scrollPos >= carouselWrapper.scrollWidth / 2) {
                scrollPos = 0;
            }
            carouselWrapper.scrollLeft = scrollPos;
        } else {
            // Keep scrollPos synced with user manual scrolling
            scrollPos = carouselWrapper.scrollLeft;
        }
        requestAnimationFrame(autoScroll);
    }
    
    // Start after items load
    window.addEventListener('load', () => requestAnimationFrame(autoScroll));
}

// Fade in Observer
const fadeElements = document.querySelectorAll('.fade-in');
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));


