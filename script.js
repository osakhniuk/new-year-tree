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
            initGyroscope()
          } catch (error) {
            alert("Error while requesting gyroscope permission.");
          }
        } else {
          console.log("Gyroscope permission not required.");
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
    
              // Викликаємо вібрацію через Telegram API
              if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
              }
            } else {
              shaking = false;
            }
    
            lastY = y;
    
          }
        });
      }
});
