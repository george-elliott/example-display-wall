define(
  [
    'core/assetview',
    'hbs!src/templates/asset',
    'src/js/assetlightboxview'
  ], function(
    AssetView,
    AssetTemplate,
    AssetLightboxView
  ) {

  // White Decent Asset View, Go!
  return AssetView.extend({
    lightboxViewType: AssetLightboxView
  });
});