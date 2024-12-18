class EnergySystem {
    constructor({ 
        maxEnergy = 100, 
        drainRate = 5, 
        regenRate = 2, 
        threshold = 30,
        energyBarSelector = '#energyBar' 
    } = {}) {
        this.maxEnergy = maxEnergy;
        this.drainRate = drainRate;
        this.regenRate = regenRate;
        this.threshold = threshold;
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

        if (this.currentEnergy <= this.threshold) {
            this.energyBar.classList.add('critical');
        } else {
            this.energyBar.classList.remove('critical');
        }
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

    setThreshold(newThreshold) {
        if (typeof newThreshold === 'number' && newThreshold >= 0) {
            this.threshold = newThreshold;
            this.updateEnergyBar();
        }
    }

    getCurrentEnergy() {
        return this.currentEnergy;
    }
}

class RandomIncrementer {
    constructor(initialValue = 0, element) {
        this.currentValue = initialValue;
        this.element = element;
        this.isIncrementing = false;
        
        // Перевірка, чи елемент існує
        if (!this.element) {
            console.error('Не знайдено елемент для відображення значення.');
            return;
        }

        // Оновлюємо початкове значення в DOM
        this.updateElement();

        // Запускаємо інтервал оновлення раз на секунду (можна змінити частоту за потреби)
        this.intervalId = setInterval(() => this.update(), 1000);
    }

    updateElement() {
        if (this.element.tagName.toLowerCase() === 'input') {
            // Якщо це input, оновлюємо value
            this.element.value = this.currentValue.toFixed(2);
        } else {
            // Якщо інший елемент, оновлюємо текст
            this.element.textContent = this.currentValue.toFixed(2);
        }
    }

    update() {
        if (this.isIncrementing) {
            const inc = this._getRandomIncrement();
            this.currentValue += inc;
            // Округлення до сотих
            this.currentValue = Math.round(this.currentValue * 100) / 100;
            this.updateElement();
        }
    }

    // Метод, що задає режим інкрементування
    setIncrement(mode) {
        this.isIncrementing = mode;
    }

    // Зупиняє оновлення, якщо потрібно
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    getCurrentValue() {
        return this.currentValue;
    }

    _getRandomIncrement() {
        const r = Math.random();
        let increment = 0.0;

        if (r < 0.20) {
          increment = this._randomInRange(0.01, 0.1);
        } else if (r < 0.50) {
          increment = this._randomInRange(0.11, 0.2);
        } else if (r < 0.70) {
          increment = this._randomInRange(0.21, 0.3);
        } else if (r < 0.85) {
          increment = this._randomInRange(0.31, 0.49);
        } else if (r < 0.95) {
          increment = this._randomInRange(0.5, 0.62);
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
