/**
 * Created by radik on 26.09.17.
 */


define([
        'jquery',
        'backbone',
        'underscore',
        'authSync',
        'marionette'
    ],
    function($, Backbone, _, authSync) {
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
            initialize: function () {
                this.syncOb = new authSync.AuthSyncObj({
                    view: this
                });
                this.listenTo(this.syncOb, 'alert', function (data) {
                    console.log('catch alert');
                    this.showChildView('alert', new AlertMessage({data: data}));
                }, this);
            },
            showAlert: function (data) {
                this.showChildView('alert', new AlertMessage({data: data}));
            },
            enterAction: function () {
                var email = this.getUI('email').val();
                var password = this.getUI('password').val();
                this.syncOb.login(email, password);
            }
        });

        app.SignUpView = Backbone.Marionette.View.extend({
            template: _.template($('#signup-template').html())
        });

        app.ResetPasswordView = Backbone.Marionette.View.extend({
            template: _.template($('#reset-password-template').html()),
            ui: {
                email: 'input[name="email"]',
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
                var email = this.getUI('email').val();
                if (!email) {
                    var data = {};
                    data.status = 'danger';
                    data.message = 'Поле не заполнено';
                    this.showAlert(data);
                    return
                }
                var secretAuth;
                try {
                    secretAuth = btoa(email + ":unused");
                } catch (err) {
                    data = {};
                    data.status = 'danger';
                    data.message = 'Некорретные символы';
                    this.showAlert(data);
                    return
                }
                var dummy = {
                    url: function () {
                        return 'https://chicago.it-open.net/v1/auth/reset/'
                    },
                    trigger: function () {

                    },
                    toJSON: function () {
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
                            if (codeError == 425) {
                                var data = {};
                                data.status = 'danger';
                                data.message = 'Неверный формат email';
                                self.showAlert(data);
                                return;
                            }
                            if (codeError == 427) {
                                var data = {};
                                data.status = 'danger';
                                data.message = 'Email не найден';
                                self.showAlert(data);
                                return;
                            }
                            if (codeError == 429) {
                                var data = {};
                                data.status = 'danger';
                                data.message = 'Вы не подтвердили email';
                                self.showAlert(data);
                                return;
                            }
                        } else {
                            var data = {};
                            data.status = 'success';
                            data.message = 'Информация по восстановлению выслана вам на email';
                            self.showAlert(data);

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

        app.HostListView = Backbone.Marionette.View.extend({
            template: _.template($('#hostlist-template').html())
        });

        return app;
    }
);
