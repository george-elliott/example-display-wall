define(
  [
    'src/js/tileview',
    'components/wall'
  ], function(
    TileView,
    WallView
  ) {

    return WallView.extend({
      itemViewType: TileView
    });
});
