/**
 * Created by radik on 26.09.17.
 */

define(['backbone', 'globals', 'sync', 'models'],
    function (Backbone, globals, Sync, models) {
        var app = {};

        var chicagoSync = Sync();

        chicagoSync.addMiddleware(function(next, method, model, options) {
            console.log(options);

            var oldSucces = options.success;
            var secretAuth;
            var username = localStorage.accessKey;
            secretAuth = btoa(username + ":unused");

            options.beforeSend = function(xhr) {
                // self.getOption('view').$el.waitMe(optionsWaitMe);

                xhr.setRequestHeader("Authorization", "Basic " + secretAuth);
            };
            options.success = function (model, resp, xhr) {
                var PrepareModel = model.result;
                oldSucces(PrepareModel, resp, xhr)
            };

            next(method, model, options);
        });

        app.HostCollection = Backbone.Collection.extend({
            sync: chicagoSync,
            url: globals.rootPath + 'host/',
            model: models.HostModel
        });

        return app
});
