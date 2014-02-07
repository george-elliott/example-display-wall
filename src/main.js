define(
  [
    'src/js/layout',
    'json!src/schema.json',
    'core/runner'
  ], function(
    Layout,
    Schema,
    Runner
  ) {

  var demoConfig = {
    id: "demo-wall",
    album: {
      url: "//api.getchute.com/v2/albums/atydrnmb"
    },
    albumOptions: {
      per_page: 30,
      sort: 'id'
    },
    enable: {
      infiniteScroll: true,
      masonry: true
    },
    itemViewOptions: {
      width: 150,
      margin: 10,
      padding: 10,
      lightboxOptions: {
        width: 400,
        enable: {
          avatar: true,
          username: true,
          caption: true,
          hearting: true,
          sharing: {
            facebook: true,
            twitter: true,
            tumblr: true,
            pinterest: true,
            googleplus: true
          }
        }
      },
      enable: {
        avatar: true,
        username: true,
        caption: true,
        time: true,
        hearting: true
      }
    }
  };

  var DisplayRunner = new Runner('Wall', Layout, Schema, demoConfig);
});

