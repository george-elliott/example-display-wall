define(
  [
    'underscore',
    'src/js/tileview',
    'src/js/tweetview',
    'src/js/instagramview',
    'components/wall',
    'masonry',
    'jquery'
  ], function(
    _,
    AssetView,
    TweetView,
    InstagramView,
    WallView,
    Masonry,
    $
  ) {

    return WallView.extend({
      buildItemView: function(model) {
        var options = _.extend({}, this.itemViewOptions, {model: model});
        return this.getItemViewType(options);
      },
      getItemViewType: function(options) {
        if (options.model.get("service") === "twitter") {
          return new TweetView(options);
        } else if (options.model.get("service") === "instagram") {
          return new InstagramView(options);
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
        this.addScript();
      },

      checkIfDone: function() {

        if (this.pendingViews.length == this.loadedViews.length) {
          this.triggerMethod('itemviews:load', this.pendingViews);
          this.loadedViews = [];
          this.pendingViews = [];
          // var that = this;
          // setTimeout(function() { that.masonry.layout();}, 1300);
        }
      },
      addScript: function () {
        $.getScript("//platform.twitter.com/widgets.js").done(this.layoutMasonry()) ;
      },
      layoutMasonry: function () {
        if (this.currentPage === 1) {
          var that = this;
          setTimeout(function() { that.masonry.layout();}, 1250);
          this.masonry.layout();
        } else {
          this.masonry.layout();
        }
      }
    });
});
