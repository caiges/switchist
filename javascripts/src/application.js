/*global console*/

/**
* Switcher
* Module Export
* Switcher module for the sites.
*/
var Switcher = (function () {
  var sw = {},
      i_frame_ = {},
      sites = [
        'www.corpedia.com',
        'www.ethisphere.com',
        'www.reddit.com'
      ],
      site_counter_ = 0,
      switch_timer_ = 15000,
      switch_nav_ = $('#switcher_nav'),
      timeout_,
      highlight_classname_ = 'highlighted',
      paused = false,
      pause_button_ = $('#pause_button'),
      unpause_button_ = $('#unpause_button');
      
  function switchLocation(){    
    var location_ = sites[site_counter_];
    
    switch_nav_.children().each(function(i,e){
      var element_ = $(e);
      element_.removeClass(highlight_classname_);
      if (e.text == location_){
        element_.addClass(highlight_classname_);
      }
    });
    
    i_frame_.attr('src', 'http://' + location_);
    site_counter_ = (site_counter_ + 1 > sites.length - 1) ? 0 : site_counter_ + 1;
    if(!paused){
      clearTimeout(timeout_);
      timeout_ = setTimeout(switchLocation, switch_timer_);
    }
  }
  
  function navigateLocation(location){
    var location_position_;
    $(sites).each(function(i,e){
      if(e == location){
        site_counter_ = i;
      }
    });
    
    switchLocation();
  }
  
  function pause(){
    console.log('pausing');
    paused = true;
    clearTimeout(timeout_);
    unpause_button_.focus();
  }
  
  function unpause(){
    console.log('unpausing');
    paused = false;
    switchLocation();
    pause_button_.focus();
  }

  function init_(frame_name) {
    i_frame_ = $('#framer');
    $(sites).each(function(i,e){
      jQuery("<a>", {
        text: e,
        href: 'http://' + e,
        
        click: function(e) {
          e.preventDefault();
          Switcher.navigateLocation(this.text);
        }
      }).appendTo(switch_nav_);
    });
    
    $('#pause_button, #unpause_button').click(function(e){
      e.preventDefault();
      Switcher[this.text]();
    });
    
    pause_button_.focus();
    
    switchLocation();
  }

  sw.name = "Switcher";
  
  sw.pause = pause;
  
  sw.unpause = unpause;
  
  sw.navigateLocation = navigateLocation;
  
  sw.init = function (frame_name) {
    init_(frame_name);
  };

  return sw;
}());