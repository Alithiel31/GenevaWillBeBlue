document.addEventListener('DOMContentLoaded', () => {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;

      // Fermer les autres accordéons
      document.querySelectorAll('.accordion-content').forEach(c => {
        if (c !== content) {
          c.classList.remove('active');
          c.previousElementSibling.classList.remove('active');
        }
      });

      // Basculer l'actuel
      header.classList.toggle('active');
      content.classList.toggle('active');
    });
  });
});