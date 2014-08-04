'use strict';

module.exports = function(grunt) {

    grunt.config.merge({
        browserify: {
            main: {
                files: {
                    'scripts/app.js': [
                    'bower_components/angular/angular.js',
                    'scripts/app/**/module.js',
                    'scripts/app/**/directives/*.js',
                    'scripts/app/**/filters/*.js'
                    ]
                }    
            }    
        },

        ngmin: {
            main: {
                src: ['scripts/app.js'],
                dest: 'scripts/app.js'
            }            
        },

        less: {
            main: {
                files: {
                    'content/style.css': [
                        'content/style.less'
                    ]
                },
                sourceMap: true
            }
        },

        autoprefixer: {
            main: {
                src: 'content/style.css'
            }    
        },

        watch: {
            styles: {
                files: ['**/*.less'],
                tasks: ['styles']
            },
            scripts: {
                files: [
                    'scripts/app/**/*.js',
                    'scripts/modules/**/*.js'
                ],
                tasks: ['scripts']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-ngmin');

    grunt.registerTask('styles', ['less:main', 'autoprefixer:main']);
    grunt.registerTask('scripts', ['browserify:main']);
    grunt.registerTask('scripts:prod', ['scripts', 'ngmin:main']);

    grunt.registerTask('default', ['scripts', 'styles']);
    grunt.registerTask('develop', ['scripts', 'styles', 'watch']);
}