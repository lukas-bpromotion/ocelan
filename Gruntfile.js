module.exports = function (grunt) {
	var pageUrl = 'localhost/BP_OCElan_redesign'; // URL webu pro browserSync
	var folders = {
		assets: 'assets', // cekta k obecnym assets
		assetsImages: 'assets/images', // cekta k obrazkum assets
		assetsFavicon: 'assets/images/favicon', // cekta k favicon assets
		assetsJS: 'assets/js', // cekta k JS assets
		assetsLESS: 'assets/less', // cekta k LESS assets
		assetsSpriteImages: 'assets/sprite', // cekta k sprite obrazkum assets
		assetsTemplates: 'assets/templates', // cekta k templatum assets
		public: 'public', // cesta public slozce
		css: 'public/css', // cesta k CSS
		js: 'public/js', // cesta k JS
		images: 'public/images', // cesta k obrazkum
		templates: 'public/templates', // cesta k templatum
		imagesRelative: '../images' // relativní cesta k obrazkum v CSS, odpovídá hodnotě ve !vars.less
	};

	var imageminPngquant = require('imagemin-pngquant');
	var imageminMozjpeg = require('imagemin-mozjpeg');

	// Nastaví správné názvy balíčku pro JIT
	require('jit-grunt')(grunt, {
		sprite: 'grunt-spritesmith'
	});

	grunt.initConfig({
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						folders.css + '/style.css',
						//folders.templates + '/**/*.html',
						//folders.public + '/**/*.php',
						//folders.assetsImages + '/**/*'
					]
				},
				options: {
					proxy: pageUrl,
					watchTask: true
				}
			}
		},
		concurrent: {
			dev: {
				tasks: ['watch:less', 'watch:scriptsUser', 'watch:scriptsLibs', 'watch:scriptsPlain', 'watch:sprites', 'watch:templates'],
				options: {
					logConcurrentOutput: true,
					limit: 8
				}
			}
		},
		watch: {
			options: {
				debounceDelay: 250
			},
			less: {
				files: [folders.assetsLESS + '/**/*.less'],
				tasks: ['less:dev', 'less:critical']
			},
			scriptsUser: {
				files: [folders.assetsJS + '/*.js'],
				tasks: 'concat:scriptsUser'
			},
			scriptsLibs: {
				files: [folders.assetsJS + '/libs/*.js'],
				tasks: 'concat:scriptsLibs'
			},
			scriptsPlain: {
				files: [folders.assetsJS + '/plain/*.js'],
				tasks: ['copy:scriptsPlain', 'copy:scriptCriticalHead']
			},
			sprites: {
				files: [folders.assetsSpriteImages + '/*.png'],
				tasks: 'sprite:dev'
			},
			templates: {
				files: [folders.assetsTemplates + '/**/*.php'],
				tasks: 'copy:html'
			}
		},
		less: {
			dev: {
				options: {
					sourceMap: true,
					sourceMapURL: 'style.css.map'

				},
				src: folders.assetsLESS + '/style.less',
				dest: folders.css + '/style.css'
			},
			rel: {
				options: {
					sourceMap: false
				},
				src: folders.assetsLESS + '/style.less',
				dest: folders.css + '/style.css'
			},
			critical: {
				options: {
					sourceMap: false
				},
				src: folders.assetsLESS + '/style.critical.less',
				dest: folders.css + '/style.critical.css'
			},
			amp: {
				options: {
					sourceMap: false
				},
				src: folders.assetsLESS + '/style.amp.less',
				dest: folders.css + '/style.amp.css'
			}
		},
		cssmin: {
			options: {
				aggressiveMerging: false,
				keepSpecialComments: 0
			},
			rel: {
				src: folders.css + '/style.css',
				dest: folders.css + '/style.css'
			},
			critical: {
				src: folders.css + '/style.critical.css',
				dest: folders.css + '/style.critical.css'
			},
			amp: {
				src: folders.css + '/style.amp.css',
				dest: folders.css + '/style.amp.css'
			}
		},
		clean: {
			rel: [folders.css + '/style.css.map', folders.css + '/style.css', folders.js + '/**/*'],
			js: [folders.js + '/**/*'],
			jsmap: [folders.js + '/*.map'],
			images: [folders.images + '/**/*']
		},
		concat: {
			options: {
				sourceMap: true
			},
			scriptsLibs: {
				src: folders.assetsJS + '/libs/*.js',
				dest: folders.js + '/libs.js'
			},
			scriptsUser: {
				src: folders.assetsJS + '/*.js',
				dest: folders.js + '/main.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! Generated: <%= grunt.template.today("yyyy-mm-dd hh:ss") %> */\n',
				preserveComments: false
			},
			rel: {
				files: [
					{src: folders.js + '/libs.js', dest: folders.js + '/libs.js'},
					{src: folders.js + '/main.js', dest: folders.js + '/main.js'},
					{src: folders.js + '/head.js', dest: folders.js + '/head.js'}
				]
			}
		},
		copy: {
			scriptsPlain: {
				expand: true,
				flatten: true,
				src: folders.assetsJS + '/plain/*',
				dest: folders.js + '/',
				filter: 'isFile'
			},
			scriptCriticalHead: {
				src: folders.js + '/head.js',
				dest: folders.js + '/head.critical.js'
			},
			imagesAll: {
				expand: true,
				cwd: folders.assetsImages + '/',
				src: ['**/*'],
				dest: folders.images + '/'
			},
			imagesRestExt: {
				expand: true,
				cwd: folders.assetsImages + '/',
				src: ['**/*', '!**/*.{png,jpg}'],
				dest: folders.images + '/'
			},
			faviconRestExt: {
				expand: true,
				cwd: folders.assetsFavicon + '/',
				src: ['**/*', '!**/*.png'],
				dest: folders.images + '/favicon/'
			},
			html: {
				expand: true,
				cwd: folders.assetsTemplates + '/',
				src: ['**/*.php'],
				dest: folders.public + '/'
			}
		},
		sprite: {
			dev: {
				src: folders.assetsSpriteImages + '/*.png',
				retinaSrcFilter: folders.assetsSpriteImages + '/*-2x.png',
				dest: folders.assetsImages + '/sprite.png',
				retinaDest: folders.assetsImages + '/sprite-2x.png',
				imgPath: folders.imagesRelative + '/sprite.png',
				retinaImgPath: folders.imagesRelative + '/sprite-2x.png',
				destCss: folders.assetsLESS + '/sprite-src.less',
				padding: 5,
				cssFormat: 'less_retina',
				cssOpts: {
					functions: false,
					variableNameTransforms: ['camelize']
				},
				cssVarMap: function (sprite) {
					sprite.name = 'sprite--' + sprite.name;
				}
			}
		},
		imagemin: {
			png: {
				options: {
					use: [
						imageminPngquant({
							quality: 70,
							speed: 5
						})
					]
				},
				files: [
					{
						expand: true,
						cwd: folders.assetsImages + '/',
						src: ['**/*.png'],
						dest: folders.images + '/',
						ext: '.png'
					}
				]
			},
			jpgDevelop: {
				options: {
					use: [
						imageminMozjpeg({
							quality: 100
						})
					]
				},
				files: [
					{
						expand: true,
						cwd: folders.assetsImages + '/',
						src: ['**/*.jpg'],
						dest: folders.images + '/',
						ext: '.jpg'
					}
				]
			},
			jpgRel: {
				options: {
					use: [
						imageminMozjpeg({
							quality: 80
						})
					]
				},
				files: [
					{
						expand: true,
						cwd: folders.assetsImages + '/',
						src: ['**/*.jpg'],
						dest: folders.images + '/',
						ext: '.jpg'
					}
				]
			}
		},
		pngmin: {
			dev: {
				options: {
					concurrency: 10, // specify how many exucutables get spawned in parallel 
					ext: '.png', // use .png as extension for the optimized files 
					quality: '99-100', // output quality should be between 65 and 80 like jpeg quality 
					speed: 10, // pngquant should be as fast as possible 
					iebug: false // optimize image for use in Internet Explorer 6 
				},
				files: [
					{
						expand: true,
						cwd: folders.assetsImages + '/',
						src: ['**/*.png'],
						dest: folders.images + '/'
					}
				]
			},
			rel: {
				options: {
					concurrency: 10, // specify how many exucutables get spawned in parallel 
					ext: '.png', // use .png as extension for the optimized files 
					quality: '40-95', // output quality should be between 65 and 80 like jpeg quality 
					speed: 1, // pngquant should be as fast as possible 
					iebug: false // optimize image for use in Internet Explorer 6 
				},
				files: [
					{
						expand: true,
						cwd: folders.assetsImages + '/',
						src: ['**/*.png'],
						dest: folders.images + '/'
					}
				]
			}
		},
		criticalcss: {
			custom: {
				options: {
					url: pageUrl,
					filename: folders.css + '/style.css', // Using path.resolve( path.join( ... ) ) is a good idea here
					width: 1280,
					height: 720,
					outputfile: folders.css + '/style.critical.css',
					forceInclude: [],
					buffer: 800 * 1024,
					ignoreConsole: false,
					restoreFontFaces: false
				}
			}
		},
		critical: {
			test: {
				options: {
					base: '/',
					css: [
						'css/style.css'
					],
					width: 320,
					height: 70
				},
				src: 'index.php',
				dest: 'css/crit/critical.css'
			}
		},
		penthouse: {
			extract: {
				outfile: '/css/crit/out.css',
				css: '/css/style.css',
				url: 'http://localhost:3000/bpromo',
				width: 1300,
				height: 900,
				skipErrors: false // this is the default 
			},
		},
		uncss: {
			dist: {
				files: {
					'css/tidy.css': ['_templates/pages/index.html']
				}
			}
		},
		htmlmin: {// Task
			rel: {// Target
				options: {// Target options
					collapseBooleanAttributes: true,
					collapseInlineTagWhitespace: false,
					conservativeCollapse: false,
					preserveLineBreaks: false,
					preventAttributesEscaping: false,
					sortAttributes: true,
					sortClassName: true,
					removeComments: true,
					collapseWhitespace: true
				},
				files: [
					{
						expand: true,
						cwd: folders.assetsTemplates + '/',
						src: ['**/*.php'],
						dest: folders.public + '/'
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-criticalcss');
	grunt.loadNpmTasks('grunt-pngmin');
	grunt.loadNpmTasks('grunt-critical');
	grunt.loadNpmTasks('grunt-penthouse');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('default', ['dev', 'browserSync:dev', 'concurrent:dev']); // synchronizuje browser a watch
	grunt.registerTask('build', ['clean:rel', 'sprite:dev', 'less:critical', 'less:rel', 'cssmin:critical', 'cssmin:rel', 'concat:scriptsLibs', 'concat:scriptsUser', 'copy:scriptsPlain', 'uglify:rel', 'copy:scriptCriticalHead', 'clean:jsmap', 'clean:images', 'copy:imagesAll']); // kompletní příprava pro produkci
	grunt.registerTask('dev', ['clean:rel', 'sprite:dev', 'less:critical', 'less:dev', 'cssmin:critical', 'concat:scriptsLibs', 'concat:scriptsUser', 'copy:scriptsPlain', 'copy:scriptCriticalHead', 'copy:html', 'clean:images', 'copy:imagesAll']); // příprava pro developery
	grunt.registerTask('images', ['clean:images', 'pngmin:rel', 'imagemin:jpgRel', 'copy:imagesRestExt']); // komprese obrazku
	grunt.registerTask('test', ['uglify:rel', 'copy:scriptCriticalHead']); // testovaci task
	grunt.registerTask('critcss', ['less:critical', 'cssmin:critical']); // critical CSS path
	grunt.registerTask('hmin', ['htmlmin:rel']); // html minification
};