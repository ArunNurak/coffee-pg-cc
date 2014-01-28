(function () {

  rnc.Views.Details = Backbone.View.extend({
    tagName: 'section',
    events: {
    },

    initialize: function (options) {
      this.template = options.template;
      rnc.Event.on('details:show', this.show, this);
    },

    render: function () {
      var content = $(this.template).html();
//      $(this.el).html(content);
      $(this.el).html(_.template(content, rnc.Collections.coffeeShops.getBusinessById(rnc.CurrentListing)));
      $('#goBack').removeClass('off');
      return this;
    },

    show: function () {
      console.log('showing details');
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



//App.Pages.detailsPage = (function () {
//  var map,
//    latLong = new google.maps.LatLng(34.0522, -118.2428),
//    mapElement = $("#miniMap").get(0),
//    options = {
//      mapTypeControl: false,
//      streetViewControl: false,
//      center: latLong,
//      zoom: 13,
//      mapTypeId: google.maps.MapTypeId.ROADMAP
//    },
//    $details = $("#detailsContent");
//  return {
//    pageshow: function () {
//      /* set the CSS height dynamically */
//      var info = App.Coffee.getBusiness(App.CurrentListing),
//        divHeight, totalHeight, ctr, marker,
//        infoWindow = new google.maps.InfoWindow({}),
//        dim = App.Dimensions.get();
//
//      $details.html(App.Templates.details(info)).trigger("create");
//      divHeight = $details.height();
//      totalHeight = dim.height - divHeight - 32;
//      $("#miniMap").css('height', totalHeight);
//      ctr = new google.maps.LatLng(info.latitude, info.longitude);
//      options.center = ctr;
//      map = new google.maps.Map(mapElement, options);
//      marker = new google.maps.Marker({
//        position: ctr,
//        map: map
//      });
//      google.maps.event.addListener(marker, 'click', function () {
//        infoWindow.open(map, marker);
//      });
//    },
//    pagehide: function () {
//    }
//  };
//}());
