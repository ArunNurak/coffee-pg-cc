(function() {

  // Step 1: Wait for both jQuery and PhoneGap to initialize

  rnc.resolver.initialize(function () {

    // Step 2: now we start our app
    console.log("starting our app");

    if(typeof(StatusBar) !== "undefined"){
      StatusBar.overlaysWebView(false);
      StatusBar.backgroundColorByHexString('#CC99FF');
    }
    rnc.Collections.coffeeShops.fetch();
    rnc.Location.startWatch();

    rnc.Router = Backbone.Router.extend({
      initialize: function(el) {
        this.el = el;
        this.homeView = new rnc.Views.Home({template: '#home-template'});
        this.showListingsView = new rnc.Views.Listings({template: '#show-listings-template'});
        this.showLocationsView = new rnc.Views.Locations({template: '#show-locations-template'});
        this.detailsView = new rnc.Views.Details({template: '#view-details-template'});
        this.settingsView = new rnc.Views.Settings({template: '#view-settings-template'});
      },

      currentView: null,
      switchView: function(view) {
        console.log("switching views");

        if (this.currentView) {
          this.currentView.remove();
        }

        $('#goBack').addClass('off');

        // Render view after it is in the DOM (styles are applied)
        view.render();
        this.currentView = view;

        $('#goBack').off().on('touchstart', this, function(evt){
          history.back();
        });
      },

      routes : {
        '' : 'home',
        'home': 'home',
        'show-listings' : 'showListings',
        'show-locations' : 'showLocations',
        'view-details': 'viewDetails',
        'view-settings' : 'viewSettings',
        "history-back": 'historyBack'
      },

      home : function() {
        this.switchView(this.homeView);
        this.triggerEvent('home');
      },

      showListings : function() {
        this.switchView(this.showListingsView);
        this.triggerEvent('listings');
      },

      showLocations : function() {
        this.switchView(this.showLocationsView);
        this.triggerEvent('locations');
      },

      viewDetails : function() {
        this.switchView(this.detailsView);
        this.triggerEvent('details');
      },

      viewSettings : function() {
        this.switchView(this.settingsView);
        this.triggerEvent('settings');
      },

      triggerEvent : function(page) {
        console.log("Hi there from the " + page + " page");
        rnc.Event.trigger(page + ':show');
      }
    });

    rnc.Route = new rnc.Router($('#main-content'));
    Backbone.history.start();
  });
}());