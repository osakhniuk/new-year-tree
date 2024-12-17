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