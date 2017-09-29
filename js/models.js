/**
 * Created by radik on 26.09.17.
 */

define(['backbone', 'globals'],
    function (Backbone, globals) {
        var app = {};

        app.HostModel = Backbone.Model.extend({
            sync: globals.chicagoSync,
            urlRoot: globals.rootPath + 'host/',
            defaults: {
                name: null,
                ico: null,
                domain: {name: null, experation_date: null},
                http: {url: null, ssl: null},
                hosting: [],
                checks: []
            }
        });
        return app
});
