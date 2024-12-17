const statusElement = document.getElementById('status');
const requestBtn = document.getElementById('request-btn');
const debugElement = document.getElementById('debug');

function startListeningMotion() {
  window.addEventListener('devicemotion', (event) => {
    let acceleration = event.acceleration;
    if (!acceleration || acceleration.x === null) {
      // fallback якщо acceleration недоступне
      acceleration = event.accelerationIncludingGravity;
      if (!acceleration) {
        debugElement.textContent = "Подія devicemotion надійшла, але дані відсутні.";
        return;
      }
    }

    const { x, y, z } = acceleration;
    const shaking = isDeviceShaking(x, y, z);

   if (shaking = true){
    Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
   }
    

  }, true);
}

requestBtn.addEventListener('click', async () => {
  if (typeof DeviceMotionEvent !== 'undefined' 
      && typeof DeviceMotionEvent.requestPermission === 'function') {
    try {
      const response = await DeviceMotionEvent.requestPermission();
      if (response === 'granted') {
        startListeningMotion();
        requestBtn.style.display = 'none';
      } else {
        alert('Доступ до акселерометра не надано');
      }
    } catch (e) {
      alert('Помилка при спробі отримати доступ до акселерометра: ' + e);
    }
  } else {
    // Якщо requestPermission не підтримується (наприклад, Android)
    startListeningMotion();
    requestBtn.style.display = 'none';
  }
});

Telegram.WebApp.ready();
