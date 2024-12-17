document.addEventListener('DOMContentLoaded', () => {
    const tree = document.querySelector('.my-tree');
    const tg = window.Telegram.WebApp;

    tree.addEventListener('click', () => {
        // Додаємо клас для анімації
        tree.classList.add('shake');

        // Коли анімація закінчиться – знімаємо клас
        tree.addEventListener('animationend', () => {
            tree.classList.remove('shake');
        }, { once: true });
    });

    tg.MainButton.setText("Вібрувати");
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
        // Викликаємо тактильний імпульс
        tg.HapticFeedback.impactOccurred('medium');
    });

    const shakeStatusEl = document.getElementById('shakeStatus');
    const THRESHOLD = 5;
    const requestBtn = document.getElementById('requestBtn');

    let isShaking = false;

    function updateShakeStatus(newState) {
        if (newState && !isShaking) {
            isShaking = true;
            shakeStatusEl.textContent = "є тряска";
        } else if (!newState && isShaking) {
            isShaking = false;
            shakeStatusEl.textContent = "немає тряски";
        }
    }
    function onAccelerometerChanged(data) {
        const { x } = data;
        // Перевірка чи перевищене значення по осі X
        const shaking = Math.abs(x) > THRESHOLD;
        updateShakeStatus(shaking);
    }

    requestBtn.addEventListener('click', () => {
        tg.Accelerometer.start().then(() => {
            console.log('Accelerometer permission granted and started.');
            // Тепер ми можемо почати слухати події акселерометра
            tg.onEvent('accelerometerChanged', onAccelerometerChanged);
            requestBtn.disabled = true;
            requestBtn.textContent = "Доступ надано";
        }).catch(err => {
            console.error('Failed to start accelerometer:', err);
            alert('Не вдалося отримати доступ до акселерометра. Перевірте налаштування або доступ.');
        });
    });
});
