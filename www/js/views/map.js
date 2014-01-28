(function () {

  rnc.Views.Map = Backbone.View.extend({
    tagName: 'div',
    id: 'map',


    initialize: function (options) {
      this.template = options.template;
      rnc.Event.on('map:show', this.show, this);
      rnc.Event.on('rnc_position', this.update, this);
    },

    render: function () {
      var content = $(this.template).html();
      $(this.el).html(content);
      return this;
    },

    show: function () {
      console.log("showing map");
      $('#main-content').html(this.render().el);
      $('#goBack').removeClass('off');
      this.showMap();
      return this;
    },

    dimensions: function () {
      var width = $(window).width(),
        height = $(window).height();
      return {
        width: width,
        height: height - 96
      };
    },

    showMap: function () {
      var latLong = new google.maps.LatLng(34.0522, -118.2428),
        mapElement = $("#map").get(0),
        options = {
          center: latLong,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        dim = this.dimensions();
      $("#map").css({'height': dim.height, 'width': dim.width});
      rnc.map = new google.maps.Map(mapElement, options);
    },

    update: function (coords) {
      var lat = coords[0],
        long = coords[1];
      if (rnc.map) {
        console.log("UPDATE: " + lat + ", " + long);
        rnc.map.setCenter(new google.maps.LatLng(lat, long));
      }
    }
  });
}());