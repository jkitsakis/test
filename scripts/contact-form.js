
document.addEventListener('DOMContentLoaded', () => {
  emailjs.init('8VBPQIEh3iEgj2_Lp');

  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');
  const button = form?.querySelector('button[type="submit"]');

  if (!form || !status || !button) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (button.disabled) return;

    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get('fullName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      website: String(formData.get('website') || '').trim(),
    };

    // 🛑 spam protection
    if (payload.website) return;

    // ✅ validation
    if (!payload.fullName || !payload.email || !payload.message) {
      status.textContent = status.dataset.error || 'Συμπληρώστε τα υποχρεωτικά πεδία.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      status.textContent = 'Μη έγκυρο email.';
      return;
    }

    try {
      button.disabled = true;
      status.textContent = status.dataset.sending || 'Αποστολή...';

      await emailjs.send('service_otpkgot', 'template_efkw5bo', {
        name: payload.fullName,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        to_email: 'prosopiki.iatros@gmail.com',
      });

      status.textContent = status.dataset.success || 'Το μήνυμα στάλθηκε!';
      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      status.textContent = status.dataset.error || 'Αποτυχία αποστολής.';
    } finally {
      button.disabled = false;
    }
  });
});