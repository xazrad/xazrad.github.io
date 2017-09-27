/**
 * Created by radik on 26.09.17.
 */

define(['backbone'],
    function (Backbone) {
        var app = {};

        app.HostCollection = Backbone.Collection.extend({
            url: 'https://chicago.it-open.net/v1/host/',
            model: Backbone.Model
        });

        return app
});
