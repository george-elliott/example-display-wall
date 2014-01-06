// This should be a script that bootstraps your test by configuring Require.js and kicking __karma__.start(), probably your test-main.js file.

var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/^\/base\/test\/.*Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/components/displays/src',
    paths: {
      src: '../../../src',
      jquery: '../../jquery/jquery',
      backbone: '../../backbone/backbone',
      underscore: '../../underscore/underscore',
      hbs: '../../require-handlebars-plugin/hbs',
      json2: '../../require-handlebars-plugin/hbs/json2',
      i18nprecompile: '../../require-handlebars-plugin/hbs/i18nprecompile',
      handlebars: '../../require-handlebars-plugin/Handlebars',
      masonry: '../../masonry/masonry',
      outlayer: '../../outlayer',
      eventie: '../../eventie',
      'doc-ready': '../../doc-ready',
      'eventEmitter': '../../eventEmitter',
      'get-size': '../../get-size',
      'get-style-property': '../../get-style-property',
      'matches-selector': '../../matches-selector',
      'moment': '../../moment/moment',
      'json': '../../requirejs-plugins/src/json',
      'text': '../../requirejs-plugins/lib/text',
      'analytics': '../../analytics/src/analytics'
    },
    hbs: {
      helperPathCallback: function(name) { return 'templates/helpers/' + name; },
      templateExtension : 'hbs',
      disableI18n : true
    },
    shim: {
      underscore: {
        exports: '_',
        init: function() {
          return this._.noConflict();
        }
      },
      backbone: {
        exports: 'Backbone',
        deps: ['underscore', 'jquery'],
        init: function(_, $) {
          return this.Backbone.noConflict();
        }
      }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});