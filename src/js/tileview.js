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
    className: 'chute-asset-view instagram',
    template: AssetTemplate,
    lightboxViewType: AssetLightboxView
  });
});
