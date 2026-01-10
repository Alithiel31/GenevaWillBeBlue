export function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  if (!headers.length) return;

  headers.forEach(header => {
    header.addEventListener('click', () => {
      // 1. On récupère l'id du contenu piloté par ce bouton
      const contentId = header.getAttribute('aria-controls');
      const content = document.getElementById(contentId);

      // 2. On vérifie si l'élément est déjà ouvert
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // 3. Fermer tous les autres accordéons (Optionnel, selon votre UX)
      headers.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.classList.remove('active');
          otherHeader.setAttribute('aria-expanded', 'false');

          const otherContent = document.getElementById(otherHeader.getAttribute('aria-controls'));
          if (otherContent) {
            otherContent.classList.remove('active');
            otherContent.setAttribute('hidden', ''); // On cache physiquement
          }
        }
      });

      // 4. Basculer l'état de l'accordéon actuel
      if (isExpanded) {
        // On ferme
        header.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        content.classList.remove('active');
        content.setAttribute('hidden', '');
      } else {
        // On ouvre
        header.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        content.classList.add('active');
        content.removeAttribute('hidden'); // On rend visible
      }
    });
  });
}