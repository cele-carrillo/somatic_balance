const generatePseudoPages = require('./build/src/generate-pseudo-pages');
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: "\n\n"
            },
            dist: {
                src: [
                    'js/bootstrap.js',
                    'js/owl.carousel.js',
                    'js/jquery.magnific-popup.js',
                    'js/jquery.matchHeight.js',
                    'js/gmap3.js',
                    'js/custom.js',
                    'js/sb-custom.js'
                ],
                dest: 'js/all.js'
            } 
        },

        uglify: {
            main: {
                files: {
                    'js/all.min.js' : ['js/all.js'],
                }
            }
        },

        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/main-unprefixed.css' : '_scss/main.scss'
                }
            }
        },

        autoprefixer: {
            main: {
                src: "css/main-unprefixed.css",
                dest: "css/main.css"
            }
        },

        shell : {
            jekyllServe : {
                command : 'bundle exec jekyll serve'
            },

            jekyllBuild : {
                command : 'bundle exec jekyll build'
            }  
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'svg',
                    src: ['*.svg'],
                    dest: 'svg/min'
                }]
            }
        },

        svgstore: {
            options: {
                prefix : 'icon-',
                svg: {
                    style: 'display: none;'
                },
                cleanup: ['fill', 'style']
            },
            default: {
                files: {
                    '_includes/svg-defs.svg': ['svg/*.svg']
                }
            }
        },

        watch: {
            stylesheets: {
                files: ['_scss/**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'shell:jekyllBuild']
            },
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['concat', 'uglify', 'shell:jekyllBuild']
            },
            site: {
                files: ['**/*.html', '_layouts/*.html', '_posts/*.markdown', '_includes/*.html', '_config.yml', 'js/**/*.js', '_data/*.yml'],
                tasks: ['shell:jekyllBuild']
            },
            svgIcons: {
                files: ['svg/*.svg'],
                tasks: ['svgmin', 'svgstore', 'shell:jekyllBuild']
            },
            options: {
                spawn : false,
                livereload: true
            }
        },

        copy: {
            githooks: {
                options: {
                    mode: '0755'
                },
                files: [
                    {expand: true, src: ['_githooks/*'], dest: '.git/hooks/', filter: 'isFile', flatten: true}
                ]
            }
        },

        prompt: {
            cloudflare: {
                options: {
                    questions: [
                        {
                            config: 'cloudflare.id',
                            type: 'input',
                            message: 'Cloudflare zone id'
                        },
                        {
                            config: 'cloudflare.email',
                            type: 'input',
                            message: 'Cloudflare user email'
                        },
                        {
                            config: 'cloudflare.apiKey',
                            type: 'input',
                            message: 'Cloudflare API Key'
                        },
                    ]
                }
            }
        }
    });

    require("load-grunt-tasks")(grunt);

    grunt.registerTask('writeCloudflareConfig', function () {
        const id = grunt.config('cloudflare.id');
        const email = grunt.config('cloudflare.email');
        const apiKey = grunt.config('cloudflare.apiKey');
        const content = `id=${id}\nemail=${email}\napikey=${apiKey}`;
        grunt.file.write(`${process.env['HOME']}/.cloudflarerc`, content);
    });

    grunt.registerTask('generatePseudoPages', function() {
        const done = this.async();
        generatePseudoPages().then(() => done()).catch((error) => {
            console.log(error);
            done(false);
        })
    });

    // Define the tasks
    grunt.registerTask('compile', ['concat', 'uglify', 'sass', 'autoprefixer', 'svgmin', 'svgstore']);
    grunt.registerTask('serve', ['shell:jekyllServe']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('setup', ['prompt:cloudflare', 'writeCloudflareConfig', 'copy:githooks']);
};
