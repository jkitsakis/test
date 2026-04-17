function setupPriorityNav() {
    const nav = document.getElementById('navList');
    const more = document.getElementById('navMore');
    const dropdown = document.getElementById('moreDropdown');

    if (!nav || !more || !dropdown) return;

    const allItems = [...nav.querySelectorAll('.nav-item')];

    function updateNav() {
        dropdown.innerHTML = '';
        more.style.display = 'none';

        // reset όλα πίσω στο nav
        allItems.forEach(item => {
            nav.insertBefore(item, more);
            item.style.display = 'flex';
        });

        let availableWidth = nav.offsetWidth;
        let usedWidth = more.offsetWidth;

        for (let item of allItems) {
            usedWidth += item.offsetWidth;

            if (usedWidth > availableWidth) {
                more.style.display = 'flex';
                dropdown.appendChild(item);
            }
        }
    }

    window.addEventListener('resize', updateNav);
    window.addEventListener('load', updateNav);
}

setupPriorityNav();