//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:: A simple incremental counter at fixed or random intervals
//:: Author: Mark Hayden
//:: Author Site: http://markhayden.me
//:: License: Free General Public License (GPL)
//:: Version: 1.0.0
//:: Date: 12.23.2013
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function oneTwoThree(settings){  
  window.addCommas = function(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  // SET THE LOOPING ACTION
  this.counter_loop = function(){
    var me = this;
    var big = settings.refresh_high;
    var small = settings.refresh_low;
    setTimeout(function() {
        me.counter_count();
    }, Math.floor((Math.random()*big)+small))
  }

  // GET & SET HELPER FILE
  this.counter_count = function(){
    var increment = Math.floor((Math.random()*settings.increment_high)+settings.increment_low);
    var dats = {'increment':increment, file:settings.file};
    var me = this;
    $.ajax({
      type: "POST",
      url: "bump.php",
      data:dats,
      success: function(data){
        if(settings.format == ","){
          $(settings.target).html(settings.prefix+window.addCommas(data));
        }else{
          $(settings.target).html(settings.prefix+data);
        }
      }
    });
    this.counter_loop();
  }
  this.counter_count();
}

/* SAMPLE INITIALIZATION
  var counter = new oneTwoThree({
    increment_low:1, // low end of the random number for count increment
    increment_high:100, // high end of the random number for count increment
    refresh_low:250, // low end of the random number for refresh interval
    refresh_high:2000, // high end of the random number for refresh interval
    prefix:"", // append a string to the beginning of the returned value
    format: ",", // add comma divider for three number places
    file:"count.txt", // what file holds the counter
    target:"#count"
  });
*/