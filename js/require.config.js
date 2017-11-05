/**
 * Created by radik on 05.11.17.
 */

require.config({
    baseUrl: "js",
    paths: {
        jquery: '../vendors/jquery/jquery.min',
        backbone: '../vendors/backbone-min',
        'backbone.radio': '../vendors/backbone.radio.min',
        underscore: '../vendors/underscore-min',
        marionette: '../vendors/backbone.marionette.min',
        md5: '../vendors/md5.min',
        sync: '../vendors/sync',
        moment: '../vendors/momentjs/moment-with-locales.min',
        bootstrap: '../vendors/bootstrap/js/bootstrap',
        pace: '../vendors/pacejs/pace.min',
        'jquery.validate': '../vendors/jquery.validate/jquery.validate',
        'jquery.validate.localization': '../vendors/jquery.validate/localization/messages_ru'

    },
    deps: ['start'],
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
        },
        bootstrap: ['jquery'],
        'jquery.validate.localization': ['jquery.validate'],
        start: [
            'bootstrap',
            'jquery.validate',
            'jquery.validate.localization'
        ]
    }
});