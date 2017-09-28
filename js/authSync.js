/**
 * Created by radik on 26.09.17.
 */

define(['backbone','marionette', 'globals', 'md5'],
    function (Backbone, Marionette, globals, md5) {
        const rootPath = globals.rootPath;
        var app = {};

        app.AuthSyncObj = Marionette.Object.extend({
            login: function (email, password) {
                if (!email || !password) {
                    var data = {};
                    data.status = 'danger';
                    data.message = 'Не все поля заполнены';
                    this.triggerMethod('alert', data);
                    return
                }
                var secretAuth;
                try {
                    secretAuth = btoa(email + ":" + md5(password));
                } catch (err) {
                    data = {};
                    data.status = 'danger';
                    data.message = 'Некорретные символы';
                    this.triggerMethod('alert', data);
                    return
                }
                var dummy = {
                    url: function () {
                        return rootPath + 'signin/'
                    },
                    trigger: function () {

                    },
                    toJSON: function () {
                        return {"describe": "WEBApp"};
                    }
                };
                var self = this;
                var options = {
                    success: function (model, resp, xhr) {
                        if (!model.ok) {
                            var codeError = model.error.code;
                            if (codeError == 427 || codeError == 428) {
                                var data = {};
                                data.status = 'danger';
                                data.message = 'Неверные данные';
                                self.triggerMethod('alert', data);
                                return;
                            }
                            if (codeError == 429) {
                                var data = {};
                                data.status = 'danger';
                                data.message = 'Вы не подтвердили email';
                                self.triggerMethod('alert', data);
                                return;
                            }
                        } else {
                            var accessKey = model.result;
                            localStorage.accessKey = accessKey;
                            Backbone.history.navigate('', {trigger: true});
                        }
                    },
                    error: function () {
                        console.log('error');
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + secretAuth);
                    }
                };

                Backbone.sync("create", dummy, options);


            }
        });

        return app
    });
