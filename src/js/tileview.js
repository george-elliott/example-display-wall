define(
  [
    'core/assetview',
    'hbs!src/templates/asset',
    'src/js/lightboxview'
  ], function(
    AssetView,
    AssetTemplate,
    AssetLightboxView
  ) {

  // White Decent Asset View, Go!
  return AssetView.extend({
    template: AssetTemplate,
    lightboxViewType: AssetLightboxView
  });
});
