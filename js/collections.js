/**
 * Created by radik on 26.09.17.
 */

define(['backbone', 'globals', 'models'],
    function (Backbone, globals, models) {
        var app = {};

        app.HostCollection = Backbone.Collection.extend({
            sync: globals.chicagoSync,
            url: globals.rootPath + 'host/',
            model: models.HostModel
        });

        app.SessionCollection = Backbone.Collection.extend({
            sync: globals.chicagoSync,
            url: globals.rootPath + 'session/',
            model: models.SessionModel
        });

        return app
});
