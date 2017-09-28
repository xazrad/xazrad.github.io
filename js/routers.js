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
                '*actions': 'other'


            },
            other: function () {
                this.navigate('', true);
            },
            index: function () {
                if (!localStorage.accessKey) {
                    this.navigate('login', {trigger: true});
                    return
                }
                this.getOption('app').showView(new views.HostListView() );
            },
            login: function () {
                this.getOption('app').showView(new views.LoginView() );
            },
            signup: function () {
                this.getOption('app').showView(new views.SignUpView() );
            },
            resetPassword: function () {
                this.getOption('app').showView(new views.ResetPasswordView() );
            }
            // onRoute: function(name, path, args) {
            //     console.log('User navigated to ' + name+' / '+path+ ' / '+args);
            // }
        });

        return app;
});

