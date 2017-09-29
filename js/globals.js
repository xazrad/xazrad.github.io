/**
 * Created by radik on 07.04.17.
 */

define([
    'backbone'
    ],
    function(Backbone) {
        var oldSync = Backbone.sync;

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
            rootPath: 'https://chicago.it-open.net/v1/'
        }
}
);
