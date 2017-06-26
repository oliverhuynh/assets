(function($) {
// adds mobile class, and mobile os to html tag
// Default to ios
var addClass = function() {
  $("html").removeClass('ios');
  var deviceAgent = navigator.userAgent.toLowerCase();
  if (deviceAgent.match(/(iphone|ipod|ipad)/)) {
    $('html').addClass('ios');
    $('html').addClass('mobile');
    window.onerror = function(msg, url, linenumber) {
        // alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
        return true;
    }
  }

  if (deviceAgent.match(/android/)) {
    $('html').addClass('android');
    $('html').addClass('mobile');
  }

  if (deviceAgent.match(/blackberry/)) {
    $('html').addClass('blackberry');
    $('html').addClass('mobile');
  }

  if (deviceAgent.match(/(symbianos|^sonyericsson|^nokia|^samsung|^lg)/)) {
    $('html').addClass('mobile');
  }

  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  if (supportsTouch) {
    $('html').addClass('with-touch');
  }
};
addClass();


// Redraw iPhone after scrolling
$.fn.touchEnd = function(callback, timeout) {
  $(this).on('touchmove', function(e) {
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

var toReDraw = false;
$(document).touchEnd(function(){
  var element = $(this).get(0);
  element.className = element.className;
  // $('h1.page-title').text(new Date());
  // jQuery('[child="home"]').toggle();
  if (toReDraw && toReDraw.className)  {
    toReDraw.className = toReDraw.className;
    var $span = $('h1:first', toReDraw);
    $span.text($span.text());
  }
}, 1000);
$(function() {
  $("iframe").load(function() {
    try {
      toReDraw = this.contentWindow.document.body;
    }
    catch(err) {
      toReDraw = false;
    }
  })
});

// alert([7, $("html").attr('class')]);
})(jQuery);
