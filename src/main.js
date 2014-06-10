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

  new Runner('wall', Layout, Schema);
});

