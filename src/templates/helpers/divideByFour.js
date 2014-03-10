define('src/templates/helpers/divideByFour',
  [
    'handlebars'
  ], function (
    Handlebars
  ) {
  Handlebars.registerHelper('divideByFour', function(number) {
    if (typeof number === 'string') {
      number = parseInt(number, 10);
    }
    return number / 4;
  });
});
