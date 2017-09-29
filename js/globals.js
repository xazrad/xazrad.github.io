/**
 * Created by radik on 07.04.17.
 */

define([
    'backbone',
        'sync'
    ],
    function(Backbone, Sync) {
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
                // console.log(model);
                var PrepareModel = model.result;
                oldSucces(PrepareModel, resp, xhr)
            };

            next(method, model, options);
        });

        // var oldSync = Backbone.sync;

        // Backbone.sync = function(method, model, options){
        //     options.beforeSend = function(xhr){
        //         console.log('BEFORE SEND');
        //         var username = '15255155oxUynNLYhpHzfaDElQabUPqT';
        //         xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":unused"));
        //     };
        //
        //     var oldError = options.error;
        //     options.error = function (xhr, textStatus, errorThrown) {
        //         // console.log('error');
        //         // console.log(xhr);
        //         // console.log(textStatus);
        //         // console.log(errorThrown);
        //
        //         oldError(xhr, textStatus, errorThrown);
        //     };
        //     var oldSuccess = options.success;
        //     options.success = function (data, textStatus, jqXHR) {
        //         // console.log('success');
        //         // console.log(data);
        //         // console.log(textStatus);
        //         var dataPrepared = data.result;
        //         oldSuccess(dataPrepared, textStatus, jqXHR);
        //     };
        //
        //     return oldSync(method, model, options);
        // };

        return {
            rootPath: rootPath,
            chicagoSync: chicagoSync
        }
}
);
