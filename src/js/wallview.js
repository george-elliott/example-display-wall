define(
  [
    'underscore',
    'src/js/tileview',
    'src/js/tweetview',
    'components/wall'
  ], function(
    _,
    AssetView,
    TweetView,
    WallView
  ) {

    return WallView.extend({
      buildItemView: function(model) {
        var options = _.extend({}, this.itemViewOptions, {model: model});
        return this.getItemViewType(options);
      },
      getItemViewType: function(options) {
        if (options.model.get("type") === "tweet") {
          return new TweetView(options);
        } else {
          return new AssetView(options);
        }
      }
    });
});
