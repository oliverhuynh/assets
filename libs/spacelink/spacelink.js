(function ($) {
  var spaceLink = {
    build: function() {
      var spaceurl = this.element.attr('data-spaceurl');
      var $element = this.element;
      this.element.after('<span class="input-wrapper"><input class="space-input" name="spaceinput" type="text" /></span>');
      this.element.siblings(".input-wrapper").find(".space-input").autocomplete({
        source: this.element.attr("data-autourl"),
        minLength: 1,
        select: function( event, ui ) {
          var surl = spaceurl.replace('SPACE', ui.item.value);
          $element.attr('href', surl);
        }
      });
    }
  };
  $(document).ready(function() {
    var slMajor = $.objectbuilder(spaceLink, 'sl');
    slMajor.refresh($( ".space-link" ), {});
  });
})(jQuery);
