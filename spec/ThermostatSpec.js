describe("Thermostat", function() {

  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe("#new", function() {
    it("starts at 20 degrees", function() {
      expect(thermostat._temp).toEqual(20);
    });
    it("has power saving mode on by default", function() {
      expect(thermostat._isPowerSavingMode).toEqual(true);
    });
  })

  describe("#temp", function() {
    it("returns the temperature", function() {
      expect(thermostat.temp()).toEqual(20);
    });
  });

  describe("changing the temperature", function() {
    it("increments temperature by one", function() {
      thermostat.up();
      expect(thermostat.temp()).toEqual(21);
    });

    it("does not let you decrement below 10", function() {
      thermostat._temp = 10;
      thermostat.down();
      expect(thermostat._temp).toEqual(10);
    });

    it("decrements temperature by one", function() {
      thermostat.down();
      expect(thermostat.temp()).toEqual(19);
    });

    it("does not let you increment above max", function() {
      thermostat._temp = 25;
      spyOn(thermostat, 'max').and.returnValue(25);
      thermostat.up();
      expect(thermostat._temp).toEqual(25);
    });
  });

  describe("#min", function() {
    it("has a minimum temp of 10 degrees", function() {
      expect(thermostat.min()).toEqual(10);
    });
  });

  describe("#max", function() {
    it("returns 25 when power saving mode is on", function() {
      expect(thermostat.max()).toEqual(25);
    });

    it("returns 32 when power saving mode is off", function() {
      thermostat._isPowerSavingMode = false;
      expect(thermostat.max()).toEqual(32);
    });
  });

  describe("#isPowerSavingMode", function() {
    it("returns _isPowerSavingMode", function() {
      expect(thermostat.isPowerSavingMode()).toEqual(true);
    });
  });

  describe("#reset", function() {
    it("resets temperature to 20", function() {
      thermostat._temp = 25;
      thermostat.reset();
      expect(thermostat._temp).toEqual(20);
    });
  });

  describe("#usage", function() {
    it("returns low-usage if temp is below 18", function() {
      thermostat._temp = 16;
      expect(thermostat.usage()).toEqual("low-usage");
    });

    it("returns medium-usage if temp is below 18", function() {
      thermostat._temp = 23;
      expect(thermostat.usage()).toEqual("medium-usage");
    });

    it("returns high-usage if temp is below 18", function() {
      thermostat._temp = 30;
      expect(thermostat.usage()).toEqual("high-usage");
    });
  });

  describe('#switchMode', function() {
    it("switches power saving mode on or off", function() {
      thermostat.switchMode();
      expect(thermostat._isPowerSavingMode).toBe(false);
    });

    it("reduces temperature to new maximum if required", function() {
      thermostat._isPowerSavingMode = false;
      thermostat._temp = 100;
      thermostat.switchMode();
      expect(thermostat._temp).toEqual(25);
    });
  });
});
