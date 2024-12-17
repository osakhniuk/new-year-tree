class EnergySystem {
    constructor({ 
        maxEnergy = 100, 
        drainRate = 5, 
        regenRate = 2, 
        energyBarSelector = '#energyBar' 
    } = {}) {
        this.maxEnergy = maxEnergy;
        this.drainRate = drainRate;
        this.regenRate = regenRate;
        this.currentEnergy = maxEnergy;
        this.isDraining = false;
        this.energyBar = document.querySelector(energyBarSelector);

        if (!this.energyBar) {
            console.error('Не знайдено елемент для відображення енергії за вказаним селектором.');
            return;
        }

        this.updateEnergyBar();
        this.intervalId = setInterval(() => this.update(), 100);
    }

    updateEnergyBar() {
        const percent = (this.currentEnergy / this.maxEnergy) * 100;
        this.energyBar.style.width = percent + '%';
    }

    update() {
        if (this.isDraining) {
            this.currentEnergy -= (this.drainRate * 0.1);
            if (this.currentEnergy < 0) this.currentEnergy = 0;
        } else {
            this.currentEnergy += (this.regenRate * 0.1);
            if (this.currentEnergy > this.maxEnergy) this.currentEnergy = this.maxEnergy;
        }
        this.updateEnergyBar();
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    setDrainMode(mode) {
        this.isDraining = mode;
    }

    setRates(newDrainRate, newRegenRate) {
        if (typeof newDrainRate === 'number') this.drainRate = newDrainRate;
        if (typeof newRegenRate === 'number') this.regenRate = newRegenRate;
    }

    setMaxEnergy(newMax) {
        if (typeof newMax === 'number' && newMax > 0) {
            this.maxEnergy = newMax;
            if (this.currentEnergy > this.maxEnergy) this.currentEnergy = this.maxEnergy;
            this.updateEnergyBar();
        }
    }

    getCurrentEnergy() {
        return this.currentEnergy;
    }
}

class RandomIncrementer {
    constructor(initialValue, element) {
      this.currentValue = initialValue;
      this.element = element;
      this.intervalId = null;
  
      this.updateElement(); // Встановлюємо початкове значення в DOM
    }
  
    startIncrementing() {
      if (!this.intervalId) {
        this.intervalId = setInterval(() => {
          const inc = this._getRandomIncrement();
          this.currentValue += inc;
          this.currentValue = Math.round(this.currentValue * 100) / 100; // округлення до сотих
          this.updateElement();
        }, 1000);
      }
    }
  
    stopIncrementing() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  
    updateElement() {
      if (this.element) {
        this.element.textContent = this.currentValue.toFixed(2);
      }
    }
  
    _getRandomIncrement() {
      const r = Math.random();
      let increment = 0.0;
  
      if (r < 0.20) {
        increment = this._randomInRange(0.01, 0.5);
      } else if (r < 0.50) {
        increment = this._randomInRange(0.51, 1.0);
      } else if (r < 0.70) {
        increment = this._randomInRange(1.01, 2.0);
      } else if (r < 0.85) {
        increment = this._randomInRange(2.01, 3.0);
      } else if (r < 0.95) {
        increment = this._randomInRange(3.01, 4.0);
      } else if (r < 0.96) {
        increment = this._randomInRange(4.01, 5.0);
      } else if (r < 0.965) {
        increment = this._randomInRange(5.01, 9.99);
      } else if (r < 0.966) {
        increment = 10.0;
      } else {
        increment = 0.0;
      }
  
      return Math.round(increment * 100) / 100;
    }
  
    _randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  }
  