var SETTINGS = {
  initialTemp: 20,
  step: 1,
  min: 10,
  PSMax: 25,
  max: 32,
  lowUsage: 18,
  mediumUsage: 25
}

function Thermostat (settings = SETTINGS) {
  this.settings = settings;
  this._temp = this.settings.initialTemp;
  this._isPowerSavingMode = true;
}


Thermostat.prototype.temp = function () {
  return this._temp;
};

Thermostat.prototype.up = function () {
  this._temp = Math.min(this._temp + this.settings.step, this.max());
};

Thermostat.prototype.down = function () {
  this._temp = Math.max(this._temp - this.settings.step, this.min());
};

Thermostat.prototype.min = function () {
  return this.settings.min;
};

Thermostat.prototype.isPowerSavingMode = function () {
  return this._isPowerSavingMode;
};

Thermostat.prototype.max = function () {
  return this.isPowerSavingMode() ? this.settings.PSMax : this.settings.max;
};

Thermostat.prototype.reset = function () {
  this._temp = this.settings.initialTemp;
};

Thermostat.prototype.usage = function () {
  if (this._temp < this.settings.lowUsage) {
    return "low-usage";
  } else if (this._temp < this.settings.mediumUsage) {
    return "medium-usage";
  } else {
    return "high-usage";
  }
};

Thermostat.prototype.switchMode = function () {
  this._isPowerSavingMode = !this._isPowerSavingMode;
};
