(function () {

  rnc.Views.Locations = Backbone.View.extend({
    tagName: 'div',
    id: 'map',
    markers: [],
    latitude: 34.0522,
    longitude: -118.2428,
    wasUpdated: false,

    initialize: function (options) {
      this.template = options.template;
      rnc.Event.on('locations:show', this.show, this);
      rnc.Event.on('rnc_position', this.update, this);
    },

    render: function () {
      var content = $(this.template).html();
      $(this.el).html(content);
      return this;
    },

    show: function () {
      console.log("showing map");
      $('#goBack').removeClass('off');
      $('#main-content').html(this.render().el);
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
      var that = this;

      rnc.Location.getCurrentPosition(function (position) {
        var latLong = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          mapElement = $("#map").get(0),
          options = {
            center: latLong,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          },
          dim = that.dimensions();
//        rnc.Collections.coffeeShops.setLocation()

        $("#map").css({'height': dim.height, 'width': dim.width});
        rnc.map = new google.maps.Map(mapElement, options);

        that.drawMarkers(rnc.map, rnc.Collections.coffeeShops.toJSON());
      }, function (msg) {
        console.log("ERROR: " + msg);
      });
    },

    update: function (coords) {
      this.latitude = coords[0];
      this.longitude = coords[1];

      // for now, only update map to location initially

      if (rnc.map && !this.wasUpdated) {
        this.wasUpdated = true;
        this.showMap();
      }
    },

    drawMarkers: function (map, listings) {
      var marker, biz, ndx, len = listings.length;

      for (ndx = 0; ndx < len; ndx += 1) {
        biz = listings[ndx];
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(biz.latitude, biz.longitude),
          map: map,
          bizId: biz.listingId,
          title: biz.businessName
        });
        this.markers.push(marker);

        // when a marker is tapped execute the function below
        google.maps.event.addListener(marker, 'click', function (evt) {
          rnc.CurrentListing = this.bizId;
          rnc.Route.navigate("view-details", {trigger: true});
        });
      }
    },

    eraseMarkers: function (map) {
      var marker;

      while (this.markers && this.markers.length) {
        marker = this.markers.pop();
        marker.setMap(null);
        console.log("marker = " + marker.title + ", " + marker.bizId);
      }
    }
  });
}());