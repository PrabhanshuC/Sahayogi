const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme'); // Get user's preference

// Apply theme on page load
if (currentTheme) {
    body.classList.add(currentTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // If no stored preference, check OS preference
    body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light-theme'); // Store preference
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme'); // Store preference
    }
});

// Optional: Listen for OS theme changes if user hasn't set a preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (!localStorage.getItem('theme')) { // Only apply if no explicit user preference
        if (event.matches) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
    }
});
