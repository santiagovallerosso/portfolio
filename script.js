
let sectionOffsets = [];
let scrollNavItems = [];
let scrollSections = [];
let scrollHero = null;
let scrollHeroCinematic = null;
let scrollCinematicVideo = null;
let mainStickyNav = null;

function initScrollCoordinator() {
    scrollSections = document.querySelectorAll('section');
    scrollNavItems = document.querySelectorAll('.nav-links a');
    scrollHero = document.querySelector('.hero');
    scrollHeroCinematic = document.querySelector('.hero-cinematic');
    scrollCinematicVideo = document.querySelector('.hero-video');
    mainStickyNav = document.getElementById('sticky-nav');
    
    if (scrollSections && scrollSections.length > 0) {
        sectionOffsets = Array.from(scrollSections).map(section => ({
            id: section.getAttribute('id'),
            offsetTop: section.offsetTop,
            offsetHeight: section.clientHeight
        }));
    }
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const scrollPosition = window.pageYOffset;
    const scrollY = window.scrollY;

    if (scrollHero) {
        scrollHero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    } else if (scrollHeroCinematic && scrollCinematicVideo) {
        scrollCinematicVideo.style.transform = `translateX(-50%) translateY(calc(-50% + ${scrollPosition * 0.3}px))`;
    }

    let newActiveId = "";
    if (sectionOffsets && sectionOffsets.length > 0) {
        sectionOffsets.forEach(section => {
            if (section) {
                if (scrollY >= section.offsetTop - 200) {
                    newActiveId = section.id;
                }
            }
        });
    }

    if (newActiveId && scrollNavItems && scrollNavItems.length > 0) {
        scrollNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${newActiveId}`) {
                item.classList.add('active');
            }
        });
    }

    if (mainStickyNav && scrollHero) {
        const heroBottom = scrollHero.offsetHeight;
        if (scrollY > heroBottom - 100) {
            mainStickyNav.classList.remove('hidden');
        } else {
            mainStickyNav.classList.add('hidden');
        }
    }
}

if (typeof module !== 'undefined') {
    module.exports = { initScrollCoordinator, handleScroll };
}
