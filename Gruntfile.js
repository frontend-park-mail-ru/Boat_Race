module.exports = function (grunt) {

    grunt.initConfig({

		shell: {
		    options: {
		        stdout: true,
		        stderr: true
		    },
		    server: {
		        command: 'java -cp gameserver.jar main.Main 8080'
		    }
		},

		

		fest: {
                templates: {
                   files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },
	watch: {
		fest: {
		        files: ['templates/*.xml'],
		        tasks: ['fest'],
		        options: {
		            interrupt: true,
		            atBegin: true
		        }
		    },
		    server: {
		        files: [
		            'public_html/js/**/*.js',
		            'public_html/css/**/*.css'
		        ],
		        options: {
		            livereload: true
		        }
		    }
		},
	concurrent: {
	    target: ['watch', 'shell'],
	    options: {
	        logConcurrentOutput: true
	    }
	},
	qunit: {
	    all: ['./public_html/tests/index.html']
	}
	    


    });

	// подключить все необходимые модули
	grunt.loadNpmTasks('grunt-contrib-watch');
    	grunt.loadNpmTasks('grunt-contrib-qunit');
    	grunt.loadNpmTasks('grunt-concurrent');
    	grunt.loadNpmTasks('grunt-shell');
    	grunt.loadNpmTasks('grunt-fest');
	grunt.registerTask('default', ['shell', 'watch']);
    	grunt.registerTask('test', ['qunit:all']);
    	grunt.registerTask('default', ['concurrent']);    


    // результат команды grunt
    	
};

       


    
