const webpackConfig = require('./webpack.config.js');
const {accessKeyId, secretAccessKey } = require('./credentials.json');

module.exports = function(grunt) {
  grunt.initConfig({
    s3: {
      options: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        bucket: "fantasybnb-static",
        region: 'us-east-1'
      },
      build: {
        cwd: "client/dist",
        src: "**"
      }
    },
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: false }, webpackConfig)
    },
    watch: {
        css: {
          files: ['src/css/*.scss'],
          tasks: ['sass:dev']
        },
        js: {
          files: ['src/js/*.js'],
          tasks: ['uglify:dev']
        }
      }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-aws');
//   grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask("default", ["webpack", "s3"]);
};