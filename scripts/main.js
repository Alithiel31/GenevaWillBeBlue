import { initAccordion } from './accordion_header.js';
import { initCountdown } from './scriptCtdwn.js';

document.addEventListener('DOMContentLoaded', () => {
    // On appelle les deux. Les sécurités "if" à l'intérieur 
    // de chaque fonction s'occuperont de savoir s'il faut agir ou non.
    initAccordion();
    initCountdown();
});