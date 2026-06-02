const viewport = document.getElementById('viewport');
const mockNav = document.getElementById('mock-nav');
const mockHero = document.getElementById('mock-hero');
const btns = document.querySelectorAll('.strategy-btn');
const btnStress = document.getElementById('stress-test-btn');
const consoleOut = document.getElementById('console-output');

// Metrics elements
const elEvents = document.getElementById('val-events');
const elReflows = document.getElementById('val-reflows');
const elTime = document.getElementById('val-time');
const elFps = document.getElementById('val-fps');

// State
let currentStrategy = 1; // 1, 2, or 3
let isTesting = false;

// Metrics data
let metrics = {
    events: 0,
    reflows: 0,
    timeMs: 0,
    frames: 0,
    startTime: 0,
    lastFrameTime: 0
};

// Cleanup refs
let scrollHandler = null;
let observerRef = null;
let fpsRAF = null;

// Console logger
function log(msg, type = 'info') {
    const el = document.createElement('div');
    el.className = `console-line log-${type}`;
    const time = new Date().toISOString().split('T')[1].slice(0, -1);
    el.textContent = `[${time}] > ${msg}`;
    consoleOut.appendChild(el);
    consoleOut.scrollTop = consoleOut.scrollHeight;
}

// Visual color class update for metrics
function updateMetricColors() {
    const valClass = `val-${currentStrategy}`;
    [elEvents, elReflows, elTime, elFps].forEach(el => {
        el.className = `metric-value ${valClass}`;
    });
}

// ----- STRATEGY 1: UNOPTIMIZED -----
function setupStrategy1() {
    log('Setting up Strategy 1: Unoptimized Scroll Event', 'warn');
    scrollHandler = () => {
        metrics.events++;
        const start = performance.now();

        // Anti-pattern: synchronous layout read
        const heroBottom = mockHero.offsetTop + mockHero.offsetHeight;
        metrics.reflows++; // reading layout properties forces a reflow calculation

        // Expensive mock computation to simulate heavy main thread
        let dummy = 0;
        for(let i=0; i<10000; i++) dummy += Math.random();

        if (viewport.scrollTop > heroBottom - 100) {
            mockNav.classList.add('visible');
        } else {
            mockNav.classList.remove('visible');
        }

        metrics.timeMs += performance.now() - start;
    };
    viewport.addEventListener('scroll', scrollHandler);
}

// ----- STRATEGY 2: CACHED + RAF -----
function setupStrategy2() {
    log('Setting up Strategy 2: Cached + requestAnimationFrame', 'warn');

    // Cache layout once
    const heroBottom = mockHero.offsetTop + mockHero.offsetHeight;
    let ticking = false;

    scrollHandler = () => {
        metrics.events++;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const start = performance.now();
                // No reflows here, using cached value
                if (viewport.scrollTop > heroBottom - 100) {
                    mockNav.classList.add('visible');
                } else {
                    mockNav.classList.remove('visible');
                }
                metrics.timeMs += performance.now() - start;
                ticking = false;
            });
            ticking = true;
        }
    };
    viewport.addEventListener('scroll', scrollHandler);
}

// ----- STRATEGY 3: INTERSECTION OBSERVER -----
function setupStrategy3() {
    log('Setting up Strategy 3: Intersection Observer', 'success');

    observerRef = new IntersectionObserver((entries) => {
        metrics.events++; // Only counts when intersection boundary crossed
        const start = performance.now();

        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                mockNav.classList.add('visible');
            } else {
                mockNav.classList.remove('visible');
            }
        });

        metrics.timeMs += performance.now() - start;
    }, {
        root: viewport,
        // Trigger 100px before the hero section leaves the viewport
        rootMargin: "0px 0px -100px 0px",
        threshold: 0
    });

    observerRef.observe(mockHero);
}


// --- Teardown ---
function tearDownCurrent() {
    if (scrollHandler) {
        viewport.removeEventListener('scroll', scrollHandler);
        scrollHandler = null;
    }
    if (observerRef) {
        observerRef.disconnect();
        observerRef = null;
    }
    mockNav.classList.remove('visible');
}

// --- Init Strategy ---
function initStrategy(num) {
    tearDownCurrent();
    currentStrategy = num;
    updateMetricColors();

    btns.forEach(b => {
        const type = b.getAttribute('data-strategy');
        b.className = 'strategy-btn';
        if(type == num) b.classList.add(`active-${num}`);
    });

    if (num == 1) setupStrategy1();
    else if (num == 2) setupStrategy2();
    else if (num == 3) setupStrategy3();
}


// --- FPS Counter ---
function trackFPS() {
    if (!isTesting) return;
    const now = performance.now();
    metrics.frames++;
    fpsRAF = requestAnimationFrame(trackFPS);
}

// --- Stress Test ---
function resetMetrics() {
    metrics = { events: 0, reflows: 0, timeMs: 0, frames: 0, startTime: performance.now() };
    elEvents.textContent = '0';
    elReflows.textContent = '0';
    elTime.textContent = '0ms';
    elFps.textContent = '0';
}

function updateUI() {
    elEvents.textContent = metrics.events;
    elReflows.textContent = metrics.reflows;
    elTime.textContent = metrics.timeMs.toFixed(2) + 'ms';
}

async function runStressTest() {
    if (isTesting) return;
    isTesting = true;
    btnStress.disabled = true;
    document.getElementById('sim-status').textContent = 'TESTING...';
    log('--- STRESS TEST STARTED ---', 'info');

    resetMetrics();
    trackFPS();

    // Sinusoidal scroll animation
    const duration = 2500; // 2.5 seconds
    const startY = 0;
    const maxScroll = 1500; // scroll down 1500px
    const startTick = performance.now();

    return new Promise(resolve => {
        function animateScroll(now) {
            const elapsed = now - startTick;
            updateUI();

            if (elapsed < duration) {
                // Sine wave interpolation for smooth up/down/up movement
                const progress = elapsed / duration;
                // A wave that goes down and up
                const wave = Math.sin(progress * Math.PI * 2); // 0 to 1 to 0 to -1 to 0
                // Convert wave (-1 to 1) to (0 to maxScroll)
                // We want it to go from 0 -> maxScroll -> 0
                const targetScroll = Math.abs(Math.sin(progress * Math.PI)) * maxScroll;

                viewport.scrollTop = targetScroll;
                requestAnimationFrame(animateScroll);
            } else {
                // Finish
                isTesting = false;
                cancelAnimationFrame(fpsRAF);
                updateUI();

                const totalTimeSec = (performance.now() - startTick) / 1000;
                const avgFps = Math.round(metrics.frames / totalTimeSec);
                elFps.textContent = avgFps;

                document.getElementById('sim-status').textContent = 'IDLE';
                btnStress.disabled = false;

                log(`Test Finished. Strategy ${currentStrategy}`, 'info');
                log(`Events: ${metrics.events} | Reflows: ${metrics.reflows}`, currentStrategy === 3 ? 'success' : 'warn');
                log(`Avg FPS: ${avgFps} | Exec Time: ${metrics.timeMs.toFixed(2)}ms`, avgFps >= 55 ? 'success' : 'error');
                log('---------------------------', 'info');
                resolve();
            }
        }
        requestAnimationFrame(animateScroll);
    });
}

// --- Listeners ---
btns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(isTesting) return;
        const s = parseInt(btn.getAttribute('data-strategy'));
        initStrategy(s);
    });
});

btnStress.addEventListener('click', runStressTest);

// Start with Strategy 1
initStrategy(1);
