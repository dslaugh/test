module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify', 'watch']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            main: {
                options: {
                    bundleOptions: {
                        debug: true
                    }
                },
                src: 'js/browserify_test.js',
                dest: 'js/findem.js'
            }
        },
        watch: {
            files: 'js/*',
            tasks: ['default']
        }
    });
};
