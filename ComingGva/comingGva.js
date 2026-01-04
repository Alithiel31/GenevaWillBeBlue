const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;

    // Fermer les autres
    document.querySelectorAll('.accordion-content').forEach(c => {
      if (c !== content) c.classList.remove('active');
    });

    // Toggle actuel
    content.classList.toggle('active');
  });
});
