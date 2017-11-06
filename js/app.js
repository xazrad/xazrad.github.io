

require([
    'marionette',
    'routers',
    'views/root'
    ],
function (Marionette, routers, views) {
    var App = Marionette.Application.extend({
        region: 'body',
        onBeforeStart: function(app, options) {
        },
        onStart: function(_app, options) {
            var rootView = new views.RootView();
            var router = new routers.MainRouter({
                rootView: rootView
            });
            Backbone.history.start();
        }
    });

    var app = new App();
    app.start();

});
