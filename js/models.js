/**
 * Created by radik on 26.09.17.
 */

define(['backbone'],
    function (Backbone) {
        var app = {};

        app.HostModel = Backbone.Model.extend({
            defaults: {
                name: null,
                ico: null,
                domain: {name: null, experation_date: null},
                http: {url: null, ssl: null}
            }
        });
        return app
});
