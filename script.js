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

    const requestBtn = document.getElementById('requestBtn');
    requestBtn.addEventListener("click", async () => {
        // Запит дозволу на доступ до гіроскопа (для iOS)
        if (typeof DeviceMotionEvent.requestPermission === "function") {
          try {
            const permissionState = await DeviceMotionEvent.requestPermission();
            if (permissionState === "granted") {
            } else {
              alert("Permission to access gyroscope was denied.");
            }
          } catch (error) {
            alert("Error while requesting gyroscope permission.");
          }
        } else {
          // Для Android та платформ, де дозвіл не потрібен
          console.log("Gyroscope permission not required.");
          startGame();
        }
      });
      const shakeStatusEl = document.getElementById('shakeStatus');
      const THRESHOLD = 3;

      let isShaking = false;

      function updateShakeStatus(newState) {
        if (newState && !isShaking) {
            // Перехід до стану "тряска"
            isShaking = true;
            shakeStatusEl.textContent = "є тряска";
        } else if (!newState && isShaking) {
            // Перехід до стану "немає тряски"
            isShaking = false;
            shakeStatusEl.textContent = "немає тряски";
        }
    }

    // Запускаємо акселерометр
    tg.Accelerometer.start().then(() => {
        console.log('Accelerometer started');
    }).catch((err) => {
        console.error('Failed to start accelerometer:', err);
    });

    // Слухаємо подію зміни даних акселерометра
    tg.onEvent('accelerometerChanged', (data) => {
        // data матиме щось на кшталт: { x: ..., y: ..., z: ... }
        const { x, y, z } = data;

        // Перевіримо чи є значне прискорення по осі X або загалом
        const totalAcceleration = Math.sqrt(x*x + y*y + z*z);

        // Простіша логіка: якщо по X (або іншій осі) перевищено поріг
        // Можемо використати більш складну логіку, але для прикладу так
        const shaking = Math.abs(x) > THRESHOLD;
        
        updateShakeStatus(shaking);
    });

});
