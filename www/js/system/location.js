(function () {
  "use strict";

  rnc.Location = (function () {
    var watchId = null,
      callback = null,
      position = null,
      options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0
      },
      startWatch = function () {
        watchId = navigator.geolocation.watchPosition(
          function (pos) {
            var longitude = pos.coords.longitude,
              latitude = pos.coords.latitude,
              accuracy = pos.coords.accuracy,
              timeStamp = pos.timestamp;

            position = pos;
            rnc.Event.trigger("rnc_position", [latitude, longitude, accuracy]);
            console.log("Location received: " + timeStamp);
          },
          function (error) {
            console.log("Location error received: " + JSON.stringify(error));
          }, options);
      };
    return {
      startWatch: startWatch,
      clearWatch: function () {
        if (watchId) {
          navigator.geolocation.clearWatch(watchId);
          watchId = null;
        }
      },
      getCurrentPosition: function (success, error) {
        var location = rnc.Settings.get("location");
//        if (position) {
//          return success(position);
//        } else

        if (location.useGps) {
          if (position) {
            return success(position);
          }
          navigator.geolocation.getCurrentPosition(success, error, options);
        } else if (location.zipCode) {
          this.reverseGeocoder(location.zipCode, function (msg, isValid, data) {
            if (isValid) {
              //data.results[0].address_components[0].short_name
              return success({coords: {
                latitude: data.results[0].geometry.location.lat,
                longitude: data.results[0].geometry.location.lng
              }});
            }
          });
          error({message: "No location"}, false, null);
        }
      },
      reverseGeocoder: function (location, success) {
        var baseUrl = "http://maps.googleapis.com/maps/api/geocode/json?&sensor=false&address=",
          fullUrl = baseUrl + ((location+"").trim());

        $.getJSON(fullUrl, function (data) {
          console.log("success received during geocode");
          success(null, true, data);
        })
          .fail(function () {
            console.log("Error received during geocode");
            success({message: "Unable to geocode it"}, false, null);
          });
      },
      isZipCodeValid: function (zipCode, callback) {
        this.reverseGeocoder(zipCode, callback);
      }
    };
  }());
}());
