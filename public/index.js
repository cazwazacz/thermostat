
$(document).ready(function() {
  var thermostat = new Thermostat();
  var url = 'http://www.openweathermap.org/data/2.5/weather';
  var key = 'b1b15e88fa797225412429c1c50c122a1';

  function assemble_url(city, key) {
    return url + '?q=' + city + '&appid=' + key;
  };

  // $.getJSON(assemble_url('London,uk', key), function(data) {
  //   $("#localTemp").html(data.main.temp);
  // });

  $.ajaxSetup({
    'error': function() { alert('Chosen city does not exist') }
  });

  function getLocalTemp (city = 'London,uk') {
    $.getJSON(assemble_url(city, key), function(data) {
        $("#localTemp").html(data.main.temp);
        $("#cityName").html(data.name);
    });
  };

  getLocalTemp();

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

  $('#city_button').click(function() {
    var city = $('#city').val();
    getLocalTemp(city);
  });

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
