define(
  [
    'core/assetview',
    'hbs!src/templates/tweet',
    'src/js/assetlightboxview'
  ], function(
    AssetView,
    TweetTemplate,
    AssetLightboxView
  ) {

  // White Decent Asset View, Go!
  return AssetView.extend({
    lightboxViewType: AssetLightboxView,
    template: TweetTemplate,
    onRender: function() {
      var view = this;
      setTimeout(function() {
        view.triggerMethod('load:success', view);
      });
    }
  });
});
