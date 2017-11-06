/**
 * Created by radik on 26.09.17.
 */

define(['backbone',
        'marionette',
        'globals',
        'md5'
],
    function (Backbone, Marionette, globals, md5) {
        const rootPath = globals.rootPath;

        var app = {};

        app.AuthSyncObj = Marionette.Object.extend({
            sync: function (urlPath, secretAuth) {
                self = this;
                var dummy = {
                    url: function () {
                        return rootPath + urlPath
                    },
                    trigger: function () {

                    },
                    toJSON: function () {
                        // return {"describe": "WEBApp"};
                    }
                };
                var self = this;
                var options = {
                    success: function (model, resp, xhr) {
                        if (!model.ok) {
                            var data = {};
                            data.status = 'danger';

                            var codeError = model.error.code;
                            if (codeError == 425) {
                                data.message = 'Неверный формат email';
                                self.triggerMethod('alert', data);
                                return;
                            }
                            if (codeError == 426) {
                                data.message = 'Email уже используется';
                                self.triggerMethod('alert', data);
                                return;
                            }
                            if (codeError == 427) {
                                data.message = 'Email не найден';
                                self.triggerMethod('alert', data);
                                return;
                            }
                            if (codeError == 428) {
                                data.message = 'Неверные данные';
                                self.triggerMethod('alert', data);
                                return;
                            }
                            if (codeError == 429) {
                                data.message = 'Вы не подтвердили email';
                                self.triggerMethod('alert', data);
                                return;
                            }
                        } else {
                            self.triggerMethod('success', model.result);
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
            },
            getAuthBasic: function (data) {
                var username = data.email;
                var password = data.password;
                if (password == undefined) {
                    password = 'unused'
                }
                var secretAuth;
                try {
                    secretAuth = btoa(username + ":" + md5(password));
                } catch (err) {
                    var _data = {};
                    _data.status = 'danger';
                    _data.message = 'Некорретные символы';
                    this.triggerMethod('alert', _data);
                }
                return secretAuth;
            },
            resetPassword: function (data) {
                var authBasic = this.getAuthBasic(data);
                if (!authBasic) {
                    return
                }
                this.sync('auth/reset', authBasic);

            },
            login: function (data) {
                var authBasic = this.getAuthBasic(data);
                if (!authBasic) {
                    return
                }
                this.sync('auth/signin/', authBasic);
            },
            signUp: function (data) {
                var authBasic = this.getAuthBasic(data);
                if (!authBasic) {
                    return
                }
                this.sync('auth/signup/', authBasic);
            }
        });

        return app
    });
