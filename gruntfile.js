module.exports = function(grunt) {
    grunt.initConfig({

        concat: { //name of task
            options: {
                separator: '\n\n//---------------------------\n\n'
            },
            dist: {
                src: [
                    // 'js/libs/jquery-3.2.1.min.js'

                ],
                dest: 'js/script.js'
            }
        }, //concat

        bower_concat: {
            all: {
                dest: 'js/_bower.js',
                cssDest: 'css/_bower.css'
            }
        },
        uglify: {
            options: {
                mangle: false,
                sourceMap: true,
                preserveComments: false
            },
            target: {
                files: {
                    'dist/assets/js/script.min.js': ['js/script.js']
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/assets/css/style.min.css': ['css/style.css']
                }
            }
        },
        copy: {
            main: {
                files: [{
                        expand: true,
                        flatten: false,
                        cwd: 'images',
                        src: '**',
                        dest: 'dist/images',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'views',
                        src: '**',
                        dest: 'dist/views',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'fonts',
                        src: '**',
                        dest: 'dist/fonts',
                        filter: 'isFile'
                    }
                ]
            }
        },
        processhtml: {
            options: {},
            dist: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['*.html'],
                    dest: 'dist/',
                    ext: '.html'
                }, ]
            }
        },
        sass: {
            dist: {
                options: { //look at plugin website for various options
                    style: 'expanded'
                },
                files: [{
                    src: 'sass/style.scss',
                    dest: 'css/style.css'
                }]
            }
        }, //sass
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8000,
                    base: '',
                    livereload: true
                }
            }
        },

        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            scripts: {
                files: ['**/*.html',
                    'js/**/*.js',
                    'sass/**/*.scss'
                ],
                tasks: ['concat', 'sass']
            }
        }

    }); //init config section
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-concat'); //concatenates files
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.registerTask('default', ['concat', 'sass', 'connect', 'watch']);
    grunt.registerTask('dist', ['concat', 'sass', 'copy', 'uglify', 'cssmin', 'processhtml', 'cacheBust']);


}; //wrapper function