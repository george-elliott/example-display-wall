define(
  [
    'components/assetlightboxview',
    'hbs!src/templates/assetlightbox'
  ], function(
    AssetLightboxView,
    AssetLightboxTemplate
  ) {

  return AssetLightboxView.extend({
    template: AssetLightboxTemplate
  });
});

