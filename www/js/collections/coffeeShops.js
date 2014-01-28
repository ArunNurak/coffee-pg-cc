(function () {
  "use strict";

  rnc.Collections.CoffeeShops = Backbone.Collection.extend({
    model: rnc.Models.CoffeeShop,
    apiKey: "d2fdfec82a7b5cf99d3275d21f62e356",
    currentPage: 1,
    location: "92618",
    numListing: 20,
    radius: 15,
    term: "coffee",
    totalAvailable: 0,
    totalPages: 0,

    url: function () {
      // if we are running on the load test data to get over the cross site restrictions
      if (rnc.onTheWeb) {
        return "js/obsolete/test.json";
      } else {
        return "http://api2.yp.com/listings/v1/search?searchloc=" + this.location + "&pagenum=" + this.currentPage + "&term=" + this.term + "&format=json&sort=distance&radius=" + this.radius + "&listingcount=" + this.numListing + "&key=" + this.apiKey;
      }
    },

    setLocation: function (location) {
      this.location = location;
    },

    getLocation: function () {
      return this.location;
    },

    isSameLocation: function (location) {

      if(this.location === location.zipCode && this.radius === location.radius) {
        return true;
      }

      // location has changed

      this.location = location.zipCode;
      this.radius = location.radius;
      return false;
    },

    next: function () {
      this.currentPage++;
    },

    // PhoneGap apps don't have cross domain issues
    sync: function (method, model, options) {
      var ajaxRead = function (model, options) {
        // Default JSON-request options.
        var params = _.extend({
          dataType: 'json',
          type: 'GET',
          url: this.url()
        }, options);
        console.log("URL: " + params.url);
        return $.ajax(params);
      };

      switch (method) {
        case 'read':
          return ajaxRead.call(this, model, options);
        default:
          // all other verbs can't be implemented since this is a read-only third party service
          break;
      }
    },

    // need to validate returned data and filter out metadata and return only business listings
    parse: function (response) {
      var meta;
      if (response && response.searchResult && response.searchResult.metaProperties) {
        meta = response.searchResult.metaProperties;

        if (meta.resultCode === "Success") {
          this.totalAvailable = meta.totalAvailable;
          this.totalPages = Math.ceil(this.totalAvailable / this.numListing);
          var temp = response.searchResult.searchListings.searchListing;
          return temp;
        }
      }
      return [];
    },

    getBusinessById: function(id){
      var list = this.toJSON();
      var val =  _.findWhere(list, {listingId: id});
      console.log("Listing ID = " + JSON.stringify(val));
      return val;
    }

  });

  rnc.Collections.coffeeShops = new rnc.Collections.CoffeeShops();
}());
