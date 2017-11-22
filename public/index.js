
$(document).ready(function() {
  var thermostat = new Thermostat();

  function update_ps_color() {
    var color = thermostat.isPowerSavingMode() ? "green" : "red";
    $("#psm").css("background-color", color);
  };

  function update_ps_text() {
    var text = thermostat.isPowerSavingMode() ? "On" : "Off";
    $("#psm_state").html(text);
  };

  function update_temperature() {
    $("#temp").html(thermostat.temp());
  };

  function update() {
    update_temperature();
    update_ps_text();
    update_ps_color();
  };

  update();

  $("#down").click(function() {
    thermostat.down();
  });

  $("#up").click(function() {
    thermostat.up();
  });

  $("#reset").click(function() {
    thermostat.reset();
  });

  $("#psm").click(function() {
    thermostat.switchMode();
  });

  $("button").click(update);
});
