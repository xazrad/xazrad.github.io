/**
 * Created by radik on 26.09.17.
 */


define([
        'jquery',
        'backbone',
        'underscore',
        'authSync',
        'marionette'
    ],
    function($, Backbone, _, authSync) {
        var app = {};

        var AlertMessage = Backbone.Marionette.View.extend({
            template: _.template($('#alertbox-template').html()),
            templateContext: function () {
                return this.getOption('data')
            }
        });

        app.LoginView = Backbone.Marionette.View.extend({
            template: _.template($('#login-template').html()),
            ui: {
                email: 'input[name="email"]',
                password: 'input[name="password"]',
                btEnter: 'button[name="send"]'
            },
            events: {
                'click @ui.btEnter': 'enterAction'
            },
            regions: {
                alert: 'div[name="messages"]'
            },
            initialize: function () {
                this.syncOb = new authSync.AuthSyncObj({
                    view: this
                });
                this.listenTo(this.syncOb, 'alert', function (data) {
                    this.showChildView('alert', new AlertMessage({data: data}));
                }, this);

                this.listenTo(this.syncOb, 'success', function (data) {
                    localStorage.accessKey = data;
                    Backbone.history.navigate('', {trigger: true});
                }, this);

            },
            enterAction: function () {
                var email = this.getUI('email').val();
                var password = this.getUI('password').val();
                this.syncOb.login(email, password);
            }
        });

        app.SignUpView = Backbone.Marionette.View.extend({
            template: _.template($('#signup-template').html()),
            ui: {
                email: 'input[name="email"]',
                password: 'input[name="password"]',
                btEnter: 'button[name="send"]'
            },
            events: {
                'click @ui.btEnter': 'enterAction'
            },
            regions: {
                alert: 'div[name="messages"]'
            },
            initialize: function () {
                this.syncOb = new authSync.AuthSyncObj({
                    view: this
                });
                this.listenTo(this.syncOb, 'alert', function (data) {
                    this.showChildView('alert', new AlertMessage({data: data}));
                }, this);

                this.listenTo(this.syncOb, 'success', function (data) {
                    var data = {};
                    data.status = 'success';
                    data.message = 'Дополнительная информация вам выслана на email';
                    this.showChildView('alert', new AlertMessage({data: data}));
                }, this);

            },
            enterAction: function () {
                var email = this.getUI('email').val();
                var password = this.getUI('password').val();
                this.syncOb.signUp(email, password);
            }


        });

        app.ResetPasswordView = Backbone.Marionette.View.extend({
            template: _.template($('#reset-password-template').html()),
            ui: {
                email: 'input[name="email"]',
                btEnter: 'button[name="send"]'
            },
            events: {
                'click @ui.btEnter': 'enterAction'
            },
            regions: {
                alert: 'div[name="messages"]'
            },
            initialize: function () {
                this.syncOb = new authSync.AuthSyncObj({
                    view: this
                });

                this.listenTo(this.syncOb, 'alert', function (data) {
                    this.showChildView('alert', new AlertMessage({data: data}));
                }, this);

                this.listenTo(this.syncOb, 'success', function (data) {
                    var data = {};
                    data.status = 'success';
                    data.message = 'Информация по восстановлению выслана вам на email';
                    this.showChildView('alert', new AlertMessage({data: data}));
                }, this);
            },
            enterAction: function () {
                var email = this.getUI('email').val();
                this.syncOb.resetPassword(email, 'unused');
            }
        });

        app.HostListView = Backbone.Marionette.View.extend({
            template: _.template($('#hostlist-template').html())
        });

        return app;
    }
);
