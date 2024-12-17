document.addEventListener('DOMContentLoaded', () => {

    tg.MainButton.setText("Вібрувати");
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
        // Викликаємо тактильний імпульс
        tg.HapticFeedback.impactOccurred('medium');
    });
    
    const requestBtn = document.getElementById("requestBtn");
    const scoreValueElement = document.getElementById("scoreValue");
    const debugInfo = document.getElementById("debugInfo"); // Для відображення дебаг-інформації
  
    let score = 0; // Загальна кількість балів
    let shaking = false; // Стан трясіння
    let lastY = null; // Для виявлення трясіння по осі Y
  
    requestBtn.addEventListener("click", async () => {
      // Запит дозволу на доступ до гіроскопа (для iOS)
      if (typeof DeviceMotionEvent.requestPermission === "function") {
        try {
          const permissionState = await DeviceMotionEvent.requestPermission();
          if (permissionState === "granted") {
            console.log("Gyroscope permission granted!");
            initGyroscope();
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
