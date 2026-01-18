import { initAccordion } from './accordion_header.js';
import { initCountdown } from './scriptCtdwn.js';

// Dynamically load CSS to ensure it loads after JS
const cssFiles = [
    'public/style/reset.css',
    'public/style/main.css'
];

const loadCSS = (href) => {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
    });
};

Promise.all(cssFiles.map(loadCSS)).then(() => {
    // Show the body after all CSS is loaded
    document.body.style.display = 'flex';

    // Initialize components
    initAccordion();
    initCountdown();
});