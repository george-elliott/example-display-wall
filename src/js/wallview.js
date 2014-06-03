define(
  [
    'underscore',
    'src/js/tileview',
    'src/js/tweetview',
    'components/wall',
    'masonry'
  ], function(
    _,
    AssetView,
    TweetView,
    WallView,
    Masonry
  ) {

    return WallView.extend({
      buildItemView: function(model) {
        var options = _.extend({}, this.itemViewOptions, {model: model});
        return this.getItemViewType(options);
      },
      getItemViewType: function(options) {
        if (options.model.get("type") === "text") {
          return new TweetView(options);
        } else {
          return new AssetView(options);
        }
      },
      onItemviewsLoad: function(views) {
        var collectionView = this;
        if (this.enable.masonry) {
          if (this.masonry) {
            _.each(views, function(view) {
              collectionView.masonry.appended(view.el);
              view.appended = true;
            });
          } else {
            this.masonry = new Masonry(this.el, {
              gutter: this.itemViewOptions.margin,
              columnWidth: this.itemViewOptions.width,
              itemSelector: '.chute-asset-view',
              isFitWidth: true,
              hiddenStyle: {}
            });

          }
        }
        this.$el.removeClass('chute-component-loading');
        _.delay(function() {
          collectionView.$el.children().removeClass('chute-loaded');
        }, 1000);

        this.$el.after('<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>');
        this.masonry.layout();
      }
    });
});
