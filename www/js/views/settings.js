(function () {

  rnc.Views.Settings = Backbone.View.extend({
    tagName: 'section',
    currentLocation: {},
    $currentRadius: null,
    $checkBox: null,
    events: {
      "change #rangeRadius": "changeRadius",
      "tap #usingGps": "changeGps",
      "change #zipCode": "changeZipCode"
    },

    changeZipCode: function(evt){
      evt.preventDefault();
      console.log("zipping code");

      // should validate the zip code before allowing it to be changed

      this.currentLocation.zipCode = evt.target.value;
      this.saveSettings();
    },

    changeRadius: function(evt){
      evt.preventDefault();
      this.$currentRadius.text(evt.target.value);
      this.currentLocation.radius = evt.target.value;
      this.saveSettings();
    },

    changeGps: function(evt) {
      evt.preventDefault();
      var isChecked = !!!this.$checkBox.attr('checked');
      console.log("changing GPS setting: " + isChecked);
      this.currentLocation.useGps = isChecked;
      this.saveSettings();
    },

    initialize: function (options) {
      this.template = options.template;
      rnc.Event.on('settings:show', this.show, this);
    },

    render: function () {
      var content = $(this.template).html();
      $(this.el).html(content);
      return this;
    },

    show: function () {
      var $radius, $zipCode, $usingGps;

      this.currentLocation = rnc.Settings.get("location");
      $('#goBack').removeClass('off');
      $('#main-content').html(this.render().el);

      $zipCode = $('#zipCode');
      $radius = $('#rangeRadius');
      $usingGps = $('#usingGps');
      this.$currentRadius = $('#currentRadius');
      this.$checkBox = $('#usingGpsCheckbox');
      $radius.val(this.currentLocation.radius);
      $zipCode.val(this.currentLocation.zipCode);
      this.$currentRadius.text(this.currentLocation.radius);

      /* are we using the gps? */
      if(!this.currentLocation.useGps) {
        $usingGps.removeClass('on');
        this.$checkBox.attr('checked', false);
      }
      $usingGps.UISwitch();
    },

    saveSettings: function() {
      rnc.Settings.set("location", this.currentLocation);
      if(!rnc.Collections.coffeeShops.isSameLocation(this.currentLocation)){
        console.log("Location has changed");
        rnc.Collections.coffeeShops.reset();
        rnc.Collections.coffeeShops.fetch();
      }
      rnc.Settings.save();
    }
  });
}());