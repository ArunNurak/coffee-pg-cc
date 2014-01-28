
(function () {

  rnc.Views.Listings = Backbone.View.extend({
    tagName: 'section',

    initialize: function (options) {
      this.template = options.template;
      rnc.Event.on('listings:show', this.show, this);
    },

    render: function () {
      var content = $(this.template).html();
      $(this.el).html(_.template(content, {shops: rnc.Collections.coffeeShops.toJSON()}));
      return this;
    },

    show: function () {
      $('#main-content').html(this.render().el);
      $('#goBack').removeClass('off');
    }
  });
}());