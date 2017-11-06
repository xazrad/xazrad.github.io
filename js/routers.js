
define([
    'marionette'
], function (Marionette) {
    var app = {};

    var RouterController = Marionette.Object.extend({
        index: function () {
            var rootView = this.getOption('rootView');
            rootView.indexRoute();
        },
        login: function () {
            var rootView = this.getOption('rootView');
            rootView.loginRoute();
        },
        signup: function () {
            var rootView = this.getOption('rootView');
            rootView.signupRoute();
        },
        resetPassword: function () {
            var rootView = this.getOption('rootView');
            rootView.resetPasswordRoute();
        },
        other: function () {
            Backbone.history.navigate('', {trigger: true});
        },
        hostAdd: function () {
            var rootView = this.getOption('rootView');
            rootView.hostAddRoute();
        },
        hostDetail: function (hostID) {
            var rootView = this.getOption('rootView');
            rootView.hostDetailRoute(hostID);

        }

    });

    app.MainRouter = Marionette.AppRouter.extend({
        initialize: function (options) {
            this.controller = new RouterController(options)
        },
        appRoutes: {
            '': 'index',
            'login': 'login',
            'signup': 'signup',
            'reset-password': 'resetPassword',
            'host/:id': 'hostDetail',
            'hostAdd': 'hostAdd',
            '*actions': 'other'
        }
    });

    return app;
});
