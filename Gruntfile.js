/*global module:false, process:false*/
module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'lib/**/*.js',
        'specs/**/*.js',
        'examples/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    connect: {
      test: {},
      all: {
        options: {
          keepalive: true
        }
      },
      options: {
        hostname: '0.0.0.0',
        port: 8000,
        keepalive: false
      }
    },
    open: {
      test: {
        path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/_SpecRunner.html'
      }
    },
    watch: {
      test: {
        files: '<%= jshint.all %>',
        tasks: ['jshint:all', 'jasmine:all', 'jasmine:all:build', 'open:test']
      }
    },
    jasmine: {
      all: {
        options: {
          specs: 'specs/**/*Spec.js',
        }
      },
      options: {
        src: 'lib/**/*.js',
        helpers: [
          'http://code.jquery.com/jquery-2.0.0.js',
          'https://rawgithub.com/kriskowal/es5-shim/v2.0.0/es5-shim.js',
          'https://rawgithub.com/kriskowal/es5-shim/v2.0.0/es5-sham.js',
          'https://rawgithub.com/velesin/jasmine-jquery/master/lib/jasmine-jquery.js',
          'https://rawgithub.com/twitter/flight-jasmine/master/lib/flight-jasmine.js'
        ],
        templateOptions: {
          requireConfig: {
            paths: {
              flight: 'deps/flight',
              lodash: 'deps/lodash'
            }
          }
        },
        host: 'http://127.0.0.1:8000/',
        template: require('grunt-template-jasmine-requirejs')
      }
    }
  });

  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['jshint:all', 'connect:test', 'jasmine:all']);

  grunt.registerTask('test', ['jshint:all', 'connect:test', 'jasmine:all', 'jasmine:all:build', 'open:test', 'watch:test']);

};