document.addEventListener('DOMContentLoaded', () => {

  const popup = document.getElementById('qr-popup');
  const qrImage = document.getElementById('qr-image');
  const qrLink = document.getElementById('qr-link');
  const closeBtn = document.getElementById('qr-close');

  const isMobile = () =>
    window.matchMedia('(pointer: coarse)').matches ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  document.querySelectorAll('.contact-link').forEach(link => {

    link.addEventListener('click', (e) => {

      // 👉 mobile → normal tel behavior
      if (isMobile()) return;

      e.preventDefault();

      const qr = link.dataset.qr;
      const href = link.getAttribute('href');

      qrImage.src = qr;
      qrLink.href = href;

      popup.classList.add('open');
    });

  });

  // CLOSE BUTTON
  closeBtn.addEventListener('click', () => {
    popup.classList.remove('open');
    qrImage.src = '';
  });

  // CLICK OUTSIDE
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('open');
      qrImage.src = '';
    }
  });

  // ESC KEY
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popup.classList.remove('open');
      qrImage.src = '';
    }
  });

});