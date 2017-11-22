
$(document).ready(function() {
  var thermostat = new Thermostat();

  function update() {
    $("#temp").html(thermostat.temp());
  }

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
