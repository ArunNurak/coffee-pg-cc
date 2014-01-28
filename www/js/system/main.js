
var rnc;

(function() {
  rnc = {
    Models : {},
    Collections : {},
    Views : {},
    Router : {},
    Event : _.extend({}, Backbone.Events)
  };

  Backbone.View = Backbone.View.extend({
    remove: function() {
      // Empty the element and remove it from the DOM while preserving events
      $(this.el).empty().detach();
      console.log("removing a view");

      return this;
    }
  });

  rnc.map = null;

}());
