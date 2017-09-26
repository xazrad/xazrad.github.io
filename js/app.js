require([
    'jquery',
    'backbone',
    'marionette',
    'underscore',
    'collections',
    'views',
    'globals'
],
function($, Backbone, Marionette, _, collections, views) {
    var App = Backbone.Marionette.Application.extend({
        onBeforeStart: function(app, options) {
            this.hostCollection = new collections.HostCollection();
        },
        onStart: function(app, options) {
            var content = new views.Content({
                collection: this.hostCollection
            });
            content.render();
        }
    });

    var app = new App();
    app.start();

});
