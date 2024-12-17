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
    
    
    const requestBtn = document.getElementById("requestBtn");
    requestBtn.addEventListener("click", async () => {
         // Запит дозволу на доступ до гіроскопа (для iOS)
        if (typeof DeviceMotionEvent.requestPermission === "function") {
          try {
            const permissionState = await DeviceMotionEvent.requestPermission();
          } catch (error) {
            alert("Error while requesting gyroscope permission.");
          }
        } else {
          console.log("Gyroscope permission not required.");
        }
      });

      function initShakeDetection() {
        let shaking = false;
        let lastShakeTime = 0;
        const shakeThreshold = 15; // Поріг чутливості. Можна налаштувати.
        const shakeTimeout = 500;  // Час (мс), протягом якого пристрій вважається таким, що трясуть.
    
        // Встановлюємо обробник події devicemotion
        window.addEventListener('devicemotion', (event) => {
            const acc = event.accelerationIncludingGravity;
            if (!acc) return;
    
            const totalAcceleration = Math.sqrt(
                (acc.x * acc.x) +
                (acc.y * acc.y) +
                (acc.z * acc.z)
            );
            
            // Якщо прискорення перевищує поріг, оновлюємо час останньої тряски
            if (totalAcceleration > shakeThreshold) {
                lastShakeTime = Date.now();
            }
    
            // Якщо від останньої тряски пройшло менше shakeTimeout, вважаємо, що досі трясуть
            shaking = (Date.now() - lastShakeTime < shakeTimeout);
        });
    
        // Повертаємо функцію, яка при виклику покаже поточний стан тряски.
        return function isShaking() {
            return shaking;
        };
    }
    document.getElementById('shakeStatus').textContent(initShakeDetection());
});
