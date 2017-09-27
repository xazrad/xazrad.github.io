/**
 * Created by radik on 27.09.17.
 */

define([
        'backbone',
        'marionette'
    ],
    function(Backbone, Marionette) {

        var app = {};

        app.MainRouter = Marionette.AppRouter.extend({
            routes: {
                '': 'index',
                'login': 'login'
            },
            index: function () {
                if (!localStorage.accessKey) {
                    this.navigate('login', {trigger: true});
                    return
                }
                console.log('index');
            },
            login: function () {
                console.log('login');
            },
            onRoute: function(name, path, args) {
                console.log('User navigated to ' + name+' / '+path+ ' / '+args);
            }

        });

        return app;
});

