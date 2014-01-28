(function() {
  "use strict";

  rnc.Models.CoffeeShop = Backbone.Model.extend({

    // handling the parse since I want to clean up the model a bit (later)
    parse: function (response) {
      this.set(response);
    }
  });

  rnc.coffeeShop = new rnc.Models.CoffeeShop();
}());
