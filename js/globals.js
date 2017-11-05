var app = app || {};

$(function () {
    'use strict';
    var rootPath = 'https://chicago.it-open.net/v1/';

    var chicagoSync = Sync();
    chicagoSync.addMiddleware(function(next, method, model, options) {
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
    return {
        rootPath: rootPath,
        chicagoSync: chicagoSync
    }

});
