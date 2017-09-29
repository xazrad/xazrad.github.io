/**
 * Created by radik on 27.09.17.
 */

define([
        'backbone',
        'marionette',
        'views'
    ],
    function(Backbone, Marionette, views) {

        var app = {};

        app.MainRouter = Marionette.AppRouter.extend({
            routes: {
                '': 'index',
                'login': 'login',
                'signup': 'signup',
                'reset-password': 'resetPassword',
                'host/:id': 'hostDetail',
                'hostAdd': 'hostAdd',
                '*actions': 'other'

            },
            other: function () {
                this.navigate('', true);
            },
            hostDetail: function (hostID) {
                if (!localStorage.accessKey) {
                    this.navigate('login', {trigger: true});
                    return
                }
                this.getOption('app').showView(new views.HostDetailView({
                    hostID: hostID
                }) );
            },
            hostAdd: function () {
                if (!localStorage.accessKey) {
                    this.navigate('login', {trigger: true});
                    return
                }
                this.getOption('app').showView(new views.HostAddView() );
            },
            index: function () {
                if (!localStorage.accessKey) {
                    this.navigate('login', {trigger: true});
                    return
                }
                this.getOption('app').showView(new views.IndexView() );
            },
            login: function () {
                localStorage.removeItem('accessKey');
                this.getOption('app').showView(new views.LoginView() );
            },
            signup: function () {
                this.getOption('app').showView(new views.SignUpView() );
            },
            resetPassword: function () {
                this.getOption('app').showView(new views.ResetPasswordView() );
            }
        });

        return app;
});

