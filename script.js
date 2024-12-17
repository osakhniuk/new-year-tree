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
    startButton.addEventListener("click", async () => {
        await DeviceMotionEvent.requestPermission();
    });
   function updateShakeStatus(newState) {
        if (newState && !isShaking) {
            isShaking = true;
            shakeStatusEl.textContent = "є тряска";
        } else if (!newState && isShaking) {
            isShaking = false;
            shakeStatusEl.textContent = "немає тряски";
        }
    }

    // Обробник даних акселерометра
    function onAccelerometerChanged(data) {
        const { x } = data;
        const shaking = Math.abs(x) > THRESHOLD;
        updateShakeStatus(shaking);
    }

    // Кнопка для запиту доступу до акселерометра
    startBtn.addEventListener('click', () => {
        // Запускаємо акселерометр за допомогою Telegram API
        tg.Accelerometer.start().then(() => {
            console.log('Accelerometer started successfully');
            // Слухаємо подію зміни
            tg.onEvent('accelerometerChanged', onAccelerometerChanged);
            startBtn.disabled = true; // Вимикаємо кнопку після успішного запуску
            startBtn.textContent = "Акселерометр увімкнено";
        }).catch(err => {
            console.error('Failed to start accelerometer:', err);
            alert('Не вдалося отримати доступ до акселерометра.');
        });
    });
});
