document.addEventListener('DOMContentLoaded', () => {

    const backToTop = document.querySelector('.back-to-top-pill');

    if (!backToTop) return; // safety

    window.addEventListener('scroll', () => {

        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const percent = (scrollTop / docHeight) * 100;

        if (percent > 15) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});