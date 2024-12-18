
const requestBtn = document.getElementById('request-btn');
const tree = document.getElementById('tree');
const song = document.getElementById('song');
const energySystem = new EnergySystem({
    maxEnergy: 100,
    drainRate: 10,
    regenRate: 5,
    threshold: 30,
    energyBarSelector: '#energyBar'
});
const test = document.getElementById('test');
const incrementer = new RandomIncrementer(0.00, document.getElementById('valueField'));


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

    if (shaking == true){
        test.textContent = energySystem.getCurrentEnergy();
        Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        tree.classList.add('shake');
        energySystem.setDrainMode(true);
        incrementer.setIncrement(true);

    } else {
        tree.classList.remove('shake');
        energySystem.setDrainMode(false);
        incrementer.setIncrement(false);
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
  snowInterval = setInterval(() => {
    createSnowflake();
  }, 200);
  //song.play();

});
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';

    // Випадкова позиція сніжинки по осі X
    const startX = Math.random() * window.innerWidth;
    snowflake.style.left = `${startX}px`;

    snowContainer.appendChild(snowflake);

    // Видаляємо сніжинку після завершення анімації
    setTimeout(() => {
      snowflake.remove();
    }, 3000);
  }

  
Telegram.WebApp.ready();

