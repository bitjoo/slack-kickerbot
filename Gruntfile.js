'use strict';

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        nospawn: true
      },
      server: {
        files: [
          'bin/www',
          'app.js',
          'routes/*.js',
          'models/*.js'
        ],
        tasks: ['develop']
      }
    },
    develop: {
      server: {
        file: 'bin/www'
      }
    }
  });

  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'develop',
    'watch'
  ]);
};
