export function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');
  
  // Sécurité : si la page n'a pas d'accordéon, on arrête là
  if (!headers.length) return;

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;

      // Fermer les autres accordéons
      document.querySelectorAll('.accordion-content').forEach(c => {
        if (c !== content) {
          c.classList.remove('active');
          if (c.previousElementSibling) {
            c.previousElementSibling.classList.remove('active');
          }
        }
      });

      // Basculer l'actuel
      header.classList.toggle('active');
      content.classList.toggle('active');
    });
  });
}