define(
  [
    'components/lightboxview',
    'hbs!src/templates/assetlightbox',
    'jquery'
  ], function(
    LightboxView,
    AssetLightboxTemplate,
    $
  ) {

  return LightboxView.extend({
    className: 'chute-asset-lightbox-view',
    template: AssetLightboxTemplate,
    getSharingOptions: function(e) {
      var shareButton = $(e.currentTarget);
      var options = this.model.pick('thumbnail', 'caption');
      options.service = shareButton.data('chute-shareto');
      var lightboxUrl = this.lightboxUrl();
      if (lightboxUrl) {
        options.url = window.location.href.replace(window.location.hash, '')
           .replace(/#$/, '') + '#' + this.lightboxUrl();
      } else {
        options.url = window.location.href;
      }
      return options;
    },
    lightboxUrl: function() {
      var componentId = this.options.componentId;
      if (componentId) {
        var shortcut = this.model.get('shortcut');
        return '/lightbox/' + componentId + '/' + shortcut + '/';
      }
    },
    onLoadSuccess: function() {
      this.$('.chute-component-loading').removeClass('chute-component-loading');
    },
    onLoadError: function() {
      if (this.options.direction && this[this.options.direction]) {
        this[this.options.direction]();
      }
      this.model.destroy();
    }
  });
});

