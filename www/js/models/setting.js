(function() {
  "use strict";

  rnc.Models.Setting = Backbone.Model.extend({
    localStorage: new Store("Settings"),
    defaults : {
      id: 1,        // there is only one of these ever so give it an id
      hasInitialized : false,
      location : {
        useGps: true,
        radius : 20,
        zipCode : 92618,
        listings : 20
      }
    }
  });

  rnc.Settings = new rnc.Models.Setting();
}());
