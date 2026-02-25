module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			debug : {
				options : {
					sourceMap : true,
					mangle : false
				},
				files : {
					'public/dist/js/main.min.js' : [
							'public/components/jquery/dist/jquery.min.js',
							'public/components/jquery-mousewheel/jquery.mousewheel.min.js',
                            'public/components/jquery-validation/dist/jquery.validate.min.js',
                            'public/components/jquery-validation/dist/additional-methods.min.js',
                            'public/components/scrollReveal.js/dist/scrollReveal.min.js',
							'public/components/countUp.js/countUp.min.js',
							'public/src/js/*.js',
							'public/src/js/**/*.js' ]
				}
			},
			prod : {
				options : {
					sourceMap : false,
					mangle : false,
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			        '<%= grunt.template.today("yyyy-mm-dd") %> */'
				},
				files : {
					'public/dist/js/main.min.js' : [
							'public/components/jquery/dist/jquery.min.js',
							'public/components/jquery-mousewheel/jquery.mousewheel.min.js',
							'public/components/jquery-validation/dist/jquery.validate.min.js',
							'public/components/jquery-validation/dist/additional-methods.min.js',
							'public/components/scrollReveal.js/dist/scrollReveal.min.js',
							'public/components/countUp.js/countUp.min.js',
							'public/src/js/*.js',
							'public/src/js/**/*.js' ]
				}
			}
		},
		compass : {
			dist : {
				options : {
					sassDir : 'public/src/css',
					cssDir : 'public/dist/css',
					environment : 'production'
				},
				files : {
					'public/dist/css/main.css' : 'public/src/css/main.scss'
				}
			}
		},
		copy : {
			img : {
				files : [ {
					expand : true,
					cwd : 'public/src/img/',
					src : [ '**/*.{png,jpg,gif,svg}' ],
					dest : 'public/dist/img/'
				} ]
			},
			downloads : {
				files : [ {
					expand : true,
					cwd : 'public/src/downloads/',
					src : [ '**/*.*' ],
					dest : 'public/dist/downloads/'
				} ]
			}
		},
		xsltproc : {
			options : {
				stylesheet : 'public/src/xsl/layout.xsl',
				xinclude : true,
				stringparams : {
					'build-date' : '<%= grunt.template.today("yyyy-mm-dd HH:MM") %>'
				}
			},
			site : {
				files : [ {
					expand : true,
					cwd : 'public/src/data/',
					src : '*/*.xml',
					dest : 'public/dist/html/',
					ext : '.html'
				} ]
			}
		},
		clean : {
			css : {
				src : [ 'public/dist/css' ]
			},
			html : {
				src : [ 'public/dist/html' ]
			},
			img : {
				src : [ 'public/dist/img' ]
			},
			downloads : {
				src : [ 'public/dist/downloads' ]
			},
			font : {
				src : [ 'public/dist/font' ]
			},
			js : {
				src : [ 'public/dist/js' ]
			}
		},
		watch : {
			config : {
				files : [ 'Gruntfile.js' ],
				tasks : [ 'uglify:debug', 'compass', 'copy', 'xsltproc' ]
			},
			scripts : {
				files : [ 'public/src/js/**/*.js' ],
				tasks : [ 'clean:js', 'uglify:debug' ],
				options : {
					spawn : false
				}
			},
			css : {
				files : [ 'public/src/css/**/*.scss'],
				tasks : [ 'clean:css', 'compass' ]
			},
			downloads : {
				files : [ 'public/src/downloads/**/*.*' ],
				tasks : [ 'clean:downloads', 'copy:downloads' ]
			},
			images : {
				files : [ 'public/src/img/**/*.{png,jpg,gif,svg}' ],
				tasks : [ 'clean:img', 'copy:img' ]
			},
			xsltproc : {
				files : [ 'public/src/{xsl,data}/**/*.{xsl,xml}' ],
				tasks : [ 'clean:html', 'xsltproc' ]
			}
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-xsltproc');
	grunt.loadNpmTasks('grunt-newer');

	// Default task(s).
	grunt.registerTask('default', [ 'clean', 'uglify:debug', 'compass', 'copy',
			'xsltproc' ]);
	
	// Production
	grunt.registerTask('prod', [ 'clean', 'uglify:prod', 'compass', 'copy',
	                    			'xsltproc' ]);

};
