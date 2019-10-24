jQueryLatest = jQueryLatest || jQuery;
(function ($, $GLOBAL) {
  Drupal.attachBehaviors = $GLOBAL.proxy(function (context, settings) {
  // Drupal.attachBehaviors = function (context, settings) {
    if (this._in_attaching) {
      return ;
    }
    this._in_attaching = true;

    // Prepare the behavior
    var count = 0;
    $.each(Drupal.behaviors, function(v, b) {
      if ($.isFunction(Drupal.behaviors[v])) {
        Drupal.behaviors[v] = {
          'attach': Drupal.behaviors[v]
        };
      }
      if ($.isFunction(Drupal.behaviors[v].attach)) {
        count++;
        Drupal.behaviors[v]._attachPriority = Drupal.behaviors[v]._attachPriority || ('0.' + count);
      }
    });

    // console.warn(Object.keys(Drupal.behaviors));
    // Sore with weight
    var newBehaviors = Object.keys(Drupal.behaviors).sort(function(a, b) {
      var k1, k2;
      k1 = parseFloat(Drupal.behaviors[a]._attachPriority);
      k2 = parseFloat(Drupal.behaviors[b]._attachPriority);
      return k1 - k2;
    });

    // Do normal attach with new queue
    context = context || document;
    settings = settings || Drupal.settings;

    $( document ).trigger( "attachBehaviors_start" , [ context, settings ]);
    // console.warn(newBehaviors[0]);
    // Drupal._attachBehaviors(context, settings);
    $.each(newBehaviors, function(k, v) {
      if ($.isFunction(Drupal.behaviors[v].attach)) {
        try {
          Drupal.behaviors[v].attach(context, settings);
        }
        catch (e) {
          console.warn('Behaviors wrong');
          console.warn(e);
        }
      }
    });
    $( document ).trigger( "attachBehaviors_end" , [ context, settings ]);
    this._in_attaching = false;
  // };
  }, Drupal);
  Drupal.slowAttachBehaviors = $GLOBAL.debounce(500, false, Drupal.attachBehaviors);
}(jQuery, jQueryLatest));
