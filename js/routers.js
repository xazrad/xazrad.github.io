
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
        },
        sessions: function () {
            var rootView = this.getOption('rootView');
            rootView.sessionsRoute();

        }

    });

    app.MainRouter = Marionette.AppRouter.extend({
        initialize: function (options) {
            this.controller = new RouterController(options)
        },
        appRoutes: {
            '': 'index',
            'login': 'login',
            'reset-password': 'resetPassword',
            'host/:id': 'hostDetail',
            'hostAdd': 'hostAdd',
            'sessions': 'sessions',
            '*actions': 'other'
        }
    });

    return app;
});
