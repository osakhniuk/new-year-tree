document.addEventListener('DOMContentLoaded', () => {
    const tree = document.querySelector('.my-tree');

    tree.addEventListener('click', () => {
        // Додаємо клас для анімації
        tree.classList.add('shake');

        // Коли анімація закінчиться – знімаємо клас
        tree.addEventListener('animationend', () => {
            tree.classList.remove('shake');
        }, { once: true });
    });
    const vibrateBtn = document.getElementById('vibrateBtn');
    vibrateBtn.addEventListener('click', () => {
        Telegram.WebApp.HapticFeedback.impactOccurred('light');
    });

});
