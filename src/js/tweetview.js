define(
  [
    'core/assetview',
    'hbs!src/templates/tweet',
    'src/js/lightboxview'
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
    },
    serializeData: function() {
      var data = this.model.toJSON();

      data.full_name = this.model.attributes.user.name;
      data.enable = this.options.enable;
      data.asset_url = data.url + '/w/' + this.options.width;

      return data;
    }
  });
});
