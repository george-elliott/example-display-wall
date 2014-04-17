define(
  [
    'layouts/wall',
    'src/js/wallview',
    'hbs!src/templates/main.css',
    'utilities/awesm'
  ], function(
    WallLayout,
    WallView,
    WallCss,
    AWESM
  ) {

    return WallLayout.extend({
      wallViewType: WallView,
      cssTemplate: WallCss,

      initialize: function(options) {
        if (!options) { options = {}; }
        AWESM.ensureAWESM(options.awesmOptions);
        this.analytics.pageview();
        return WallLayout.prototype.initialize.call(this, options);
      },

      onShow: function() {
        WallLayout.prototype.onShow.apply(this, arguments);

        if (this.options.enable.liveUpdate) {
          this.options.collection.startPolling();
        }
      }
    });
});
