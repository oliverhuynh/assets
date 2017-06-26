jQueryLatest = jQueryLatest || jQuery;
(function ($, $GLOBAL) {
  Drupal.behaviors.js_contextual_link = {
    _attachPriority: -2,
    jcl: $GLOBAL.objectbuilder({
      build: function() {
        this.element.addClass('contextual-links-region');
        this.element.prepend(this.options['#rendered']);
      }
    }, 'jcl'),
    attach: function(context) {
      $.each(Drupal.settings.js_contextual_link, function(select, element) {
        Drupal.behaviors.js_contextual_link.jcl.refresh($(select).closest('div'), element);
      } );
    }
  };
}(jQuery, jQueryLatest));
