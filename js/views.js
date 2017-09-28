/**
 * Created by radik on 26.09.17.
 */


define([
        'jquery',
        'backbone',
        'underscore',
        'marionette'
    ],
    function($, Backbone, _) {
        var app = {};

        app.LoginView = Backbone.Marionette.View.extend({
            template: _.template($('#login-template').html())
        });

        app.SignUpView = Backbone.Marionette.View.extend({
            template: _.template($('#signup-template').html())
        });

        app.ResetPasswordView = Backbone.Marionette.View.extend({
            template: _.template($('#reset-password-template').html())
        });

        app.HostListView = Backbone.Marionette.View.extend({
            template: _.template($('#hostlist-template').html())
        });

        return app;
    }
);
