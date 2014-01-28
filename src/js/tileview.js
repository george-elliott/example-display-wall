define(
  [
    'core/assetview',
    'hbs!src/templates/asset',
    'hbs!src/templates/tweet',
    'src/js/assetlightboxview'
  ], function(
    AssetView,
    AssetTemplate,
    TweetTemplate,
    AssetLightboxView
  ) {

  // White Decent Asset View, Go!
  return AssetView.extend({
    lightboxViewType: AssetLightboxView,
    initialize: function() {
      AssetView.prototype.initialize.apply(this, arguments);
      this.template = (this.model.get('tweet') === "tweet") ? AssetTemplate : TweetTemplate;
    },
    onRender: function() {
      var view = this;
      view.$('img.chute-user-avatar').on('load error', function() {
        view.triggerMethod('load:success', view);
      });
    }
  });
});