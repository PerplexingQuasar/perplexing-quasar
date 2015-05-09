module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true, 
            src: [
            '../app/index.html',
            ], 
            dest: 'public/*'
          }
        ],
      },
    }, //copy


  concat:{
    options: {
      seperator: ';'
    },
    app: {
      src: [
        '../app/models/*.js',
        '../app/collections/*.js',
        '../app/views/*.js'
      ],
      dest: 'public/js/displaybase.js'
    },
    vendor:{
      src:[
        '../app/bower_components/underscore/underscore.js',
        '../app/bower_components/jquery/dist/jquery.js',
        '../app/bower_components/backbone/backbone.js',
        '../app/bower_components/bootstrap/dist/js/bootstrap.js',
        '../app/lib/Smooth-Div-Scroll/js/source/*.js',
        '../app/lib/headroom/*.js',
      ],
      dest: 'public/js/vendor.js'
    }
  }, //concat

  uglify:{
    options:{
      banner: '/*! displaybase <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    },
    dist:{
      files:{
        'public/js/displaybase.min.js': ['<%= concat.app.dest %>'],
        'public/js/vendor.min.js': ['<%= concat.vendor.dest %>'],
      }
    }
  },

  jshint: {
      files: [
        // Add filespec list here
        'Gruntfile.js',
        '../app/models/*.js',
        '../app/views/*.js',
        '../app/collections/*.js',
        '../app/data/library.js', //Take this out later on
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc'
      }
  },

  cssmin: {
    options: {

    },
    target:{
      files: {
        'public/css/main.min.css': [
            '../app/bower_components/bootstrap/dist/css/bootstrap.min.css',
            '../app/lib/Smooth-Div-Scroll/css/smoothDivScroll.css',
            '../app/styles/*.css'
          ]
      }
    }
  },

});

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-remove');
  //grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-shell');
  //grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', ['jshint', 'concat', 'uglify', 'cssmin']);


  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
      grunt.task.run([ 'shell' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });


};