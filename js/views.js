/**
 * Created by radik on 26.09.17.
 */


define([
        'jquery',
        'backbone',
        'underscore',
        'md5',
        'marionette'
    ],
    function($, Backbone, _, md5) {
        var app = {};

        var AlertMessage = Backbone.Marionette.View.extend({
            template: _.template($('#alertbox-template').html()),
            templateContext: function () {
                return this.getOption('data')
            }
        });

        app.LoginView = Backbone.Marionette.View.extend({
            template: _.template($('#login-template').html()),
            ui: {
                email: 'input[name="email"]',
                password: 'input[name="password"]',
                btEnter: 'button[name="send"]'
            },
            events: {
                'click @ui.btEnter': 'enterAction'
            },
            regions: {
                alert: 'div[name="messages"]'
            },
            showAlert: function (data) {
                this.showChildView('alert', new AlertMessage({data: data}));
            },
            enterAction: function () {
                console.log('enter');
                var email = this.getUI('email').val();
                var password = this.getUI('password').val();
                if (!email || !password) {
                    var data = {};
                    data.status = 'error';
                    data.message = 'Не все поля заполнены';
                    this.showAlert(data);
                    return
                }

                var secretAuth;
                try {
                    secretAuth = btoa(email + ":" + md5(password));
                } catch (err) {
                    data = {};
                    data.status = 'error';
                    data.message = 'Некорретные символы';
                    this.showAlert(data);
                    return
                }
                var dummy = {
                    url: function () {
                        return 'https://chicago.it-open.net/v1/auth/signin/'
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
                        console.log(model);
                        console.log(resp);
                        console.log(xhr);
                        if (!model.ok) {
                            var codeError = model.error.code;
                            if (codeError == 427 || codeError == 428) {
                                var data = {};
                                data.status = 'error';
                                data.message = 'Неверные данные';
                                self.showAlert(data);
                                return;
                            }
                            if (codeError == 429) {
                                var data = {};
                                data.status = 'error';
                                data.message = 'Вы не подтвердили email';
                                self.showAlert(data);
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
                        console.log('Custom BEFORE SEND');
                        var username = '15255155oxUynNLYhpHzfaDElQabUPqT';
                        xhr.setRequestHeader("Authorization", "Basic " + secretAuth);
                    }
                };

                Backbone.sync("create", dummy, options);
            }
        });

        app.SignUpView = Backbone.Marionette.View.extend({
            template: _.template($('#signup-template').html())
        });

        app.ResetPasswordView = Backbone.Marionette.View.extend({
            template: _.template($('#reset-password-template').html())
        });

        app.HostListView = Backbone.Marionette.View.extend({
            template: _.template($('#hostlist-template').html())
        });

        return app;
    }
);
