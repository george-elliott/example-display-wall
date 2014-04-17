'use strict';

module.exports = function(grunt) {
  require('dotenv').load();

  var pkg = grunt.file.readJSON('package.json'),
      _ = require('lodash');

  var ENV = process.env.ENV || 'development',
      PORT = process.env.PORT ? parseInt(process.env.PORT) : 4242;


  var prodEnv = _.any(grunt.cli.tasks, function(task) { return task.indexOf('deploy') >= 0 });

  var runnerPath;
  if (prodEnv) {
    runnerPath = '//static.getchute.com/display-runners/' + pkg.name;
  } else {
    runnerPath = '//localhost:' + PORT + '/build';
  }

  var requireConfig = {
    main: {
      options: {
        include: ['src/main'],
        insertRequire: ['src/main'],
        out: 'build/' + pkg.name + '.js'
      }
    }
  };

  requireConfig.options = {
    wrap: {
      startFile: 'components/displays/src/utilities/wrap/start.frag',
      endFile: 'components/displays/src/utilities/wrap/end.frag'
    },
    name: '../../almond/almond',
    generateSourceMaps: prodEnv,
    optimize: (prodEnv ? "uglify2" : "none"),
    preserveLicenseComments: false,
    enforceDefine: true,
    keepBuildDir: true,
    baseUrl: 'components/displays/src/',
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
      'text': '../../requirejs-plugins/lib/text'
    },
    hbs: {
      helperPathCallback: function(name) {
        if (grunt.file.exists('src/templates/helpers/' + name + '.js')) {
          return 'src/templates/helpers/' + name;
        } else {
          return 'templates/helpers/' + name;
        }
      },
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
    }
  };


  grunt.initConfig({
    pkg: pkg,

    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 1 // maximum number of notifications from jshint output
      }
    },
    notify: {
      run: {
        options: {
          message: 'Server started on port ' + PORT
        }
      },
      watch: {
        options: {
          message: 'Rebuild Complete'
        }
      },
      deploy: {
        options: {
          message: 'Project deployed!'
        }
      }
    },

    // CSS Pipeline: scss >> tmp dir >> template replace >> copy.
    // I can't figure out how to get compass to support multiple input and output folders with task, help appreciated.
    compass: {
      build: {
        options: {
          importPath: 'components/displays/src/scss',
          sassDir: 'src/scss',
          cssDir: 'tmp/templates'
        }
      }
    },

    replace: {
      // Hack to allow handlebars variables in SCSS property values.
      // Surround the entire property value in quotes.
      build: {
        expand: true,
        src: "tmp/**/main.css",
        overwrite: true,
        replacements: [
          {
            from: /^([^\n[]*)"([^\n]*{{[^\n]*}}[^\n]*)"([^\n[]*)$/gm,
            to: "$1$2$3"
          },
          {
            from: /RUNNER_PATH/g,
            to: runnerPath
          }
        ]
      }
    },


    copy: {
      html: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: '**/*.html',
            dest: "build/"
          }
        ]
      },
      cssTemplates: {
        files: [
          {
            expand: true,
            cwd: 'tmp/',
            src: '**/main.css',
            dest: 'src/',
            ext: '.css.hbs'
          }
        ]
      },
      assets: {
        files: [
          {
            expand: true,
            cwd: 'src/assets',
            src: '**/*.*',
            dest: 'build/assets/'
          }
        ]
      }

    },


    watch: {
      scss: {
        files: ['**/**.scss'],
        tasks: ['compass', 'replace', 'copy', 'clean'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['src/**/**.js', 'src/**/**.hbs', 'src/**/*.json'],
        tasks: ['jshint:check_for_develop', 'requirejs', 'notify:watch'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['copy:html'],
        options: {
          spawn: false
        }
      },
      assets: {
        files: ['src/assets/**/*.*'],
        tasks: ['copy:assets'],
        options: {
          spawn: false
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: '*',
          port: PORT,
          base: './'
        }
      }
    },

    clean: {
      tmp: ['tmp']
    },

    jshint: {
      options: {
        globals: {
          'require': true,
          'define': true
        },
        trailing: true, // prevent trailing whitespace.
        curly: true,
        undef: true,
        // Toggle this on to check for unused variables, helps find unused dependencies.
        // unused: true,
        browser: true,
        es3: true, // prevent trailing commas.
        ignores: ['components/displays/**/*.js']
      },
      check_for_develop: {
        options: {
          devel: true,
          debug: true
        },
        files: {
          src: ['src/**/*.js']
        }
      },
      check_for_deploy: {
        files: {
          src: ['src/**/*.js']
        }
      }
    },

    zschema: {
      build: {
        files: {
          'src/schema.json': []
        }
      }
    },

    requirejs: requireConfig,

    s3: {
      options: {
        key: process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        bucket: 'cdn.getchute.com',
        access: 'public-read'
      },
      deploy: {
        upload: [{
          src: 'build/*',
          dest: 'display-runners/' + pkg.name,
          options: {
            gzip: true,
            headers: {
              'Cache-Control': 'max-age=900, must-revalidate'
            }
          }
        }, {
          src: 'build/assets/*',
          dest: 'display-runners/' + pkg.name + '/assets',
          options: {
            gzip: true,
            headers: {
              'Cache-Control': 'max-age=900, must-revalidate'
            }
          }
        }, {
          src: 'build/assets/images/*',
          dest: 'display-runners/' + pkg.name + '/assets/images',
          options: {
            gzip: true,
            headers: {
              'Cache-Control': 'max-age=900, must-revalidate'
            }
          }
        }, {
          src: 'build/assets/fonts/*',
          dest: 'display-runners/' + pkg.name + '/assets/fonts',
          options: {
            gzip: true,
            headers: {
              'Cache-Control': 'max-age=900, must-revalidate'
            }
          }
        }]
      }
    },

    invalidate_cloudfront: {
      options: {
        key: process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        distribution: process.env.CF_DISTR
      },
      deploy: {
        files: [{
          expand: true,
          cwd: './build/',
          src: ['**/*'],
          filter: 'isFile',
          dest: 'display-runners/' + pkg.name
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-notify');
  grunt.task.run('notify_hooks');

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-z-schema');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-invalidate-cloudfront');

  grunt.registerTask('build', ['jshint:check_for_develop', 'zschema', 'compass', 'replace', 'copy', 'clean', 'requirejs']);
  grunt.registerTask('deploy', ['jshint:check_for_deploy', 'build', 's3', 'invalidate_cloudfront', 'notify:deploy']);
  grunt.registerTask('run', ['build', 'connect', 'notify:run', 'watch']);

};
