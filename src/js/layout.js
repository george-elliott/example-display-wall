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
      initialize: function(options) {
        if (!options) { options = {}; }
        AWESM.ensureAWESM(options.awesmOptions);
        return WallLayout.prototype.initialize.call(this, options);
      },
      wallViewType: WallView,
      cssTemplate: WallCss
    });
});
