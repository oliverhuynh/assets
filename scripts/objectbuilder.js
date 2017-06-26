/**
 * Object builder helper
 * Author: oliver at jufist dot com
 * Use case
 x = $.objectbuilder({
      build: function() {
      }
    }, 'edt');
x.refresh(elements, {})
 */
(function ($, $GLOBAL) {
  $.objectbuilder = function(prototypes, objectkey) {
    objectkey = objectkey || 'tob';
    prototypes = prototypes || {};
    var  TheObjectBuilder = {
      tob: {
        item_id: 0,
        item: function($element, options) {
          this.id = TheObjectBuilder.tob.item_id++;
          this.element = $element;
          this.options = options || {};
          this.build();
        },
        prototypes: $GLOBAL.extend({}, {
          build: function() {
          },
          refresh: function() {
          }
        }, prototypes)
      },
      get: function($element, options) {
        options = options || {};
        if (!this.inited) {
          TheObjectBuilder.tob.item.prototype = TheObjectBuilder.tob.prototypes;
          this.inited = true;
        }
        var tob = $element.data(objectkey) || 'na';
        if (tob === 'na') {
          tob = new TheObjectBuilder.tob.item($element, options);
          $element.data(objectkey, tob);
        }
        return tob;
      },
      refresh: function($elements, options) {
        var t = this;
        options = options || {};
        $elements.each(function() {
          var $element = $(this);
          var tob = t.get($element, options);
          tob.refresh();
        })
      }
    }

    return TheObjectBuilder;
  }
})(jQuery, jQueryLatest);
