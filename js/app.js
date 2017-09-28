require([
    'jquery',
    'backbone',
    'marionette',
    'underscore',
    'collections',
    'views',
    'routers',
    // 'globals'
],
function($, Backbone, Marionette, _, collections, views, routers) {

    var App = Backbone.Marionette.Application.extend({
        region: 'body',
        onBeforeStart: function(app, options) {
        },
        onStart: function(app, options) {
            var router = new routers.MainRouter({
                app: this
            });
            Backbone.history.start();
        }
    });

    var app = new App();
    app.start();

});
