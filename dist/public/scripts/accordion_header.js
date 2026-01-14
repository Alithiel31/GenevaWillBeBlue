export function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');


  headers.forEach(header => {
    header.addEventListener('click', (e) => {

      // 1. On cherche le contenu via l'ID (aria-controls)
      const contentId = header.getAttribute('aria-controls');
      let content = document.getElementById(contentId);

      // 2. Sécurité : Si l'ID ne marche pas, on cherche le voisin direct

      if (!content) {
        content = header.parentElement.nextElementSibling;
      }

      if (!content) {
        console.error("Impossible de trouver le contenu pour ce bouton.");
        return;
      }

      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // 3. On ferme les autres
      headers.forEach(h => {
        h.classList.remove('active');
        h.setAttribute('aria-expanded', 'false');
        // On cherche le contenu du voisin pour fermer aussi
        const c = document.getElementById(h.getAttribute('aria-controls')) || h.parentElement.nextElementSibling;
        if (c && c.classList.contains('accordion-content')) {
          c.classList.remove('active');
          c.setAttribute('hidden', '');
        }
      });

      // 4. On bascule l'état actuel
      if (!isExpanded) {
        header.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        content.classList.add('active');
        content.removeAttribute('hidden');
      }
    });
  });
}