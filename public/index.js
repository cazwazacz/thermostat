
$(document).ready(function() {

  function postingTemp (temp) {
    $.post('/temperature', {temperature: temp}, function(data) {
    });
  }

  var thermostat = new Thermostat();
  var url = 'http://www.openweathermap.org/data/2.5/weather';
  var key = 'b1b15e88fa797225412429c1c50c122a1';

  function assemble_url(city, key) {
    return url + '?q=' + city + '&appid=' + key;
  };

  $.ajaxSetup({
    'error': function() { alert('Chosen city does not exist') }
  });

  function getLocalTemp (city = 'London') {
    $.getJSON(assemble_url(city, key), function(data) {
        $("#localTemp").html(data.main.temp);
        $("#cityName").html(data.name);
    });
  };

  function update_ps_color() {
    var color = thermostat.isPowerSavingMode() ? "green" : "red";
    $("#psm").css("background-color", color);
  };

  function update_ps_text() {
    var text = thermostat.isPowerSavingMode() ? "On" : "Off";
    $("#psm_state").html(text);
  };

  function getTempFromApi() {
    $.get('/temperature', function(data) {
      if (data.temperature === null) {
        $('#temp').html(thermostat.tempe);
      } else {
        $('#temp').html(data.temperature);
      }
    });
  }

  function getCityFromApi() {
    $.get('/temperature', function(data) {
      if (data.city === null) {
        $('#cityName').html('London');
        getLocalTemp();
      } else {
        $('#cityName').html(data.city);
        getLocalTemp(data.city);
      }
    });
  }

  getTempFromApi();
  getCityFromApi();

  function update_temperature() {
    $("#temp").html(thermostat.temp());
  };

  function usageColor() {
    $('#temp').removeClass();
    $('#temp').addClass(thermostat.usage());
  }

  function update() {
    update_temperature();
    update_ps_text();
    update_ps_color();
    usageColor();
    postingTemp(thermostat.temp());
  };

  function postCity(city) {
    $.post('/city', {city: city}, function(data) {
    })
  }

  update();

  $('#city_button').click(function() {
    var city = $('#city').val();
    getLocalTemp(city);
    postCity(city);
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
