(function () {

  rnc.Views.Home = Backbone.View.extend({
    tagName: 'section',
    events: {
      "touchstart #show-listings": "showListings",
      "touchstart #show-locations": "showLocations",
      "touchstart #view-settings": "viewSettings"
    },

    initialize: function (options) {
      this.template = options.template;
      rnc.Event.on('home:show', this.show, this);
    },

    render: function () {
      var content = $(this.template).html();
      $(this.el).html(content);
      return this;
    },

    show: function () {
      console.log('showing home');
      $('#main-content').html(this.render().el);
    },

    showListings: function (evt) {
      evt.preventDefault();
      rnc.Route.navigate("show-listings", {trigger: true});
    },

    showLocations: function (evt) {
      evt.preventDefault();
      rnc.Route.navigate("show-locations", {trigger: true});
    },

    viewSettings: function (evt) {
      evt.preventDefault();
      rnc.Route.navigate("view-settings", {trigger: true});
    }
  });
}());