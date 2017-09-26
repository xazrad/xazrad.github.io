/**
 * Created by radik on 21.07.17.
 */

require.config({
    baseUrl: "js",
    paths: {
		jquery: '../vendors/jquery/jquery.min',
		backbone: '../vendors/backbone-min',
		'backbone.radio': '../vendors/backbone.radio.min',
		underscore: '../vendors/underscore-min',
		marionette: '../vendors/backbone.marionette.min'
    },
	shim: {
        underscore: {
            exports: '_'
        },
		backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette:{
            deps:['underscore', 'backbone', 'jquery'],
            exports: 'Marionette'
        }
    }
});
