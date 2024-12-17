
const requestBtn = document.getElementById('request-btn');
const tree = document.getElementById('tree');
const song = document.getElementById('song');
const energySystem = initEnergySystem({
    maxEnergy: 100,
    drainRate: 5,
    regenRate: 2,
    energyBarSelector: '#energyBar'
});

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
        Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        tree.classList.add('shake');
        energySystem.setDrainMode(true);
    } else {
        tree.classList.remove('shake');
        energySystem.setDrainMode(false);
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
  song.play();

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
  function initEnergySystem({
    maxEnergy = 100,
    drainRate = 5,
    regenRate = 2,
    energyBarSelector = '#energyBar'
} = {}) {

    let currentEnergy = maxEnergy;
    let isDraining = false; 

    const energyBar = document.querySelector(energyBarSelector);
    if (!energyBar) {
        console.error('Не знайдено елемент для відображення енергії за вказаним селектором.');
        return;
    }

    function updateEnergyBar() {
        let percent = (currentEnergy / maxEnergy) * 100;
        energyBar.style.width = percent + '%';
    }

    function update() {
        if (isDraining) {
            currentEnergy -= (drainRate * 0.1);
            if (currentEnergy < 0) currentEnergy = 0;
        } else {
            currentEnergy += (regenRate * 0.1);
            if (currentEnergy > maxEnergy) currentEnergy = maxEnergy;
        }
        updateEnergyBar();
    }

    const intervalId = setInterval(update, 100);

    return {
        stop: () => clearInterval(intervalId),
        setDrainMode: (mode) => {
            // mode: true - draining, false - regenerating
            isDraining = mode;
        },
        setRates: (newDrainRate, newRegenRate) => {
            if (typeof newDrainRate === 'number') drainRate = newDrainRate;
            if (typeof newRegenRate === 'number') regenRate = newRegenRate;
        },
        setMaxEnergy: (newMax) => {
            if (typeof newMax === 'number' && newMax > 0) {
                maxEnergy = newMax;
                if (currentEnergy > maxEnergy) currentEnergy = maxEnergy;
                updateEnergyBar();
            }
        },
        getCurrentEnergy: () => currentEnergy
    };
}
  
Telegram.WebApp.ready();

