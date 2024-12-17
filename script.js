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
                //initGyroscope();
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
    function initGyroscope() {
        window.addEventListener("devicemotion", (event) => {
          const { x, y, z } = event.accelerationIncludingGravity || {};
          const threshold = 5; // Порогове значення для трясіння
    
          if (y !== null) {
            const deltaY = lastY !== null ? Math.abs(y - lastY) : 0;
    
            // Виявлення трясіння
            if (deltaY > threshold) {
              shaking = true;
    
            } else {
              shaking = false;
            }
    
            lastY = y;
            document.getElementById('shakeStatus').textContent = "є тряска"ж

          }
        });
    };
      

});
