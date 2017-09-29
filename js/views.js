/**
 * Created by radik on 26.09.17.
 */


define([
        'jquery',
        'backbone',
        'underscore',
        'authSync',
        'collections',
        'models',
        'moment',
        'waitMe',
        'marionette'
    ],
    function($, Backbone, _, authSync, collection, models, moment) {
        moment.locale('ru');

        var optionsWaitMe = {
            text: 'Загрузка...',
            bg: 'rgba(255,255,255,0.90)',
            color: '#555'
        };

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
                    this.showChildView('alert', new AlertMessage({data: data}));
                }, this);

                this.listenTo(this.syncOb, 'success', function (data) {
                    localStorage.accessKey = data;
                    Backbone.history.navigate('', {trigger: true});
                }, this);

            },
            enterAction: function () {
                var email = this.getUI('email').val().trim();
                var password = this.getUI('password').val().trim();
                this.syncOb.login(email, password);
            }
        });

        app.SignUpView = Backbone.Marionette.View.extend({
            template: _.template($('#signup-template').html()),
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
                    this.showChildView('alert', new AlertMessage({data: data}));
                }, this);

                this.listenTo(this.syncOb, 'success', function (data) {
                    var data = {};
                    data.status = 'success';
                    data.message = 'Дополнительная информация вам выслана на email';
                    this.showChildView('alert', new AlertMessage({data: data}));
                }, this);

            },
            enterAction: function () {
                var email = this.getUI('email').val().trim();
                var password = this.getUI('password').val().trim();
                this.syncOb.signUp(email, password);
            }


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
            initialize: function () {
                this.syncOb = new authSync.AuthSyncObj({
                    view: this
                });

                this.listenTo(this.syncOb, 'alert', function (data) {
                    this.showChildView('alert', new AlertMessage({data: data}));
                }, this);

                this.listenTo(this.syncOb, 'success', function (data) {
                    var data = {};
                    data.status = 'success';
                    data.message = 'Информация по восстановлению выслана вам на email';
                    this.showChildView('alert', new AlertMessage({data: data}));
                }, this);
            },
            enterAction: function () {
                var email = this.getUI('email').val().trim();
                this.syncOb.resetPassword(email, 'unused');
            }
        });

        var HostView = Backbone.Marionette.View.extend({
            template: _.template($('#hostitem-template').html()),
            templateContext: function () {
                return {moment: moment}
            }
        });

        var HostListView = Backbone.Marionette.CollectionView.extend({
            childView: HostView,
            collectionEvents: {
                'sync': function (data) {
                    this.triggerMethod('end:request');
                },
                'request': function () {
                    this.triggerMethod('start:request');
                }
            },
            onRender: function () {
                console.log('render');
                this.collection.fetch();
            }
        });

        app.IndexView = Backbone.Marionette.View.extend({
            template: _.template($('#indexview-template').html()),
            regions: {
                hostList: 'div[name="host-list"]'
            },
            childViewEvents: {
                'start:request': function () {
                    this.$el.waitMe(optionsWaitMe);
                },
                'end:request': function () {
                    this.$el.waitMe('hide');
                }
            },
            onRender: function () {
                this.showChildView('hostList', new HostListView({
                    collection: new collection.HostCollection()
                }) )
            }
        });

        app.HostDetailView = Backbone.Marionette.View.extend({
            template: _.template($('#hostdetailview-template').html()),
            templateContext: function () {
                return {moment: moment}
            },
            modelEvents: {
                'change': 'render',
                'sync': function () {
                    console.log('end request');
                    this.$el.waitMe('hide');
                },
                'request': function () {
                    console.log('start request');
                    this.$el.waitMe(optionsWaitMe);
                }
            },
            initialize: function (options) {
                this.model = new models.HostModel({id: options.hostID});
            },
            onBeforeAttach: function () {
                console.log('attached');
                this.model.fetch();
            }
        });

        app.HostAddView = Backbone.Marionette.View.extend({
            template: _.template($('#hostaddview-template').html()),
            ui: {
                host: 'input[name="host"]',
                btEnter: 'button[name="send"]'
            },
            events: {
                'click @ui.btEnter': 'enterAction'
            },
            regions: {
                alert: 'div[name="messages"]'
            },
            enterAction: function () {
                var self = this;
                var host = this.getUI('host').val().trim();
                console.log(host);
                if (!host) {
                    var data = {};
                    data.status = 'danger';
                    data.message = 'Не все поля заполнены';
                    this.showChildView('alert', new AlertMessage({data: data}));
                    return
                }
                var model = new models.HostModel({
                    host: host
                });
                model.save({}, {
                    success: function (model, response, options) {
                        // console.log(model.toJSON());
                        // console.log(response);
                        data = {};
                        if (options.xhr.responseJSON.ok) {
                            data.status = 'success';
                            data.message = 'Запрос на добавление принят';
                            self.showChildView('alert', new AlertMessage({data: data}));
                        } else {
                            var codeError = options.xhr.responseJSON.error.code;
                            var message = codeError;
                            if (codeError == 435) {
                                message = 'Неверный формат Host или IP.';
                            }
                            if (codeError == 436) {
                                message = 'Host уже добавлен ранее.';
                            }
                            data.status = 'danger';
                            data.message = message;
                            self.showChildView('alert', new AlertMessage({data: data}));
                        }
                    }
                });
            }
        });
        return app;
    }
);
