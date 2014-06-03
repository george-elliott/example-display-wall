define(
  [
    'core/assetview',
    'hbs!src/templates/instagram',
    'src/js/lightboxview'
  ], function(
    AssetView,
    InstagramTemplate,
    AssetLightboxView
  ) {

  // White Decent Asset View, Go!
  return AssetView.extend({
    className: 'chute-asset-view instagram-native',
    lightboxViewType: AssetLightboxView,
    template: InstagramTemplate,
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
