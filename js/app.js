require([
    'jquery',
    'backbone',
    'marionette',
    'underscore',
    'collections',
    'views',
    'routers',
    'globals'
],
function($, Backbone, Marionette, _, collections, views, routers) {

    var App = Backbone.Marionette.Application.extend({
        onBeforeStart: function(app, options) {
            this.hostCollection = new collections.HostCollection();
        },
        onStart: function(app, options) {
            console.log('!!!');
            // var router = new routers.MainRouter();
            /** Starts the URL handling framework */
            // Backbone.history.start();

            // var content = new views.Content({
            //     collection: this.hostCollection
            // });
            // content.render();
        }
    });

    var app = new App();
    app.start();

});
