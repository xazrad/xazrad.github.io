/**
 * Created by radik on 06.11.17.
 */

define([
    'marionette',
    'backbone',
    'globals'
], function (Marionette, Backbone, globals) {
    var app = {};
    const rootPath = globals.rootPath;

    app.TaskManager = Marionette.Object.extend({
        checkTask: function (taskID) {
            var self = this;
            var secretAuth = btoa(localStorage.accessKey + ":" + 'unused');
            var dummy = {
                url: function () {
                    return rootPath + 'task/' + taskID
                },
                trigger: function () {
                },
                toJSON: function () {
                }
            };
            var options = {
                success: function (model, resp, xhr) {
                    if (model.result.state == 'SUCCESS') {
                        var check = self.checks[0];
                        var ind = self.checks.indexOf(check);
                        self.checks.splice(ind, 1);
                        var percent = ((self.length - self.checks.length)/self.length)*100;
                        self.triggerMethod('alert', percent);
                        self.loop();
                        return
                    }
                    if (model.result.state == 'FAILIRE') {
                        self.triggerMethod('error');
                        return
                    }
                    self.loop()
                },
                error: function () {
                    console.log('error');
                },
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + secretAuth);
                }
            };

            Backbone.sync("read", dummy, options);
        },
        loop: function () {
            var self = this;
            if (self.checks.length > 0) {
                var check = self.checks[0];
                self.checkTask(check);
            } else {
                self.triggerMethod('success');
            }
        },
        startChecks: function (checks) {
            this.length = checks.length;
            this.checks  = checks;
            this.loop();
        }
    });
    return app;
});