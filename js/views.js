

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'validate.options'
    ],
function ($, _, Backnone, Marionette, validateOptions) {
    var app = {};

    var NavBarView = Marionette.View.extend({
        tagName: 'ul',
        className: 'nav navbar-nav navbar-right',
        id: 'menu-top',
        template: "#navbar-auth-tmpl",
        onRender: function () {
            this.$('a').removeClass('menu-top-active');
            var fragment = Backbone.history.getFragment();
            this.$('a[href="#/'+fragment+'"]').addClass('menu-top-active');
        }
    });

    var LoginView = Marionette.View.extend({
        template: '#login-tmpl',
        events: {
            'click button': 'submit'
        },
        submit: function () {
            this.$('form').valid();
        },
        onRender: function () {
            this.$('form').validate(validateOptions);
        }
    });

    var SignUpView = Marionette.View.extend({
        template: '#signup-tml',
        events: {
            'click button': 'submit'
        },
        submit: function () {
            this.$('form').valid();
        },
        onRender: function () {
            this.$('form').validate(validateOptions);
        }
    });

    var ResetPasswordView = Marionette.View.extend({
        template: '#reset-password-tml',
        events: {
            'click button': 'submit'
        },
        submit: function () {
            this.$('form').valid();
        },
        onRender: function () {
            this.$('form').validate(validateOptions);
        }
    });

    app.RootView = Marionette.View.extend({
        el: 'body',
        template: _.noop,
        regions: {
            navBar: 'div[name="navbar"]',
            content: 'div[name="container"]'
        },
        indexRoute: function () {
            if (!localStorage.accessKey) {
                Backbone.history.navigate('login', {trigger: true});
                return;
            }
            // IndexView
        },
        loginRoute: function () {
            localStorage.removeItem('accessKey');
            this.showChildView('navBar', new NavBarView());
            this.showChildView('content', new LoginView());
        },
        signupRoute: function () {
            localStorage.removeItem('accessKey');
            this.showChildView('navBar', new NavBarView());
            this.showChildView('content', new SignUpView());
        },
        resetPasswordRoute: function () {
            this.showChildView('navBar', new NavBarView());
            this.showChildView('content', new ResetPasswordView());
        },
        hostAddRoute: function () {

        },
        hostDetailRoute: function (hostID) {
            // HostDetailView
        }
    });

    return app;
});


//     define([
//         'jquery',
//         'backbone',
//         'marionette',
//         'underscore',
//         'authSync',
//         'collections',
//         'models',
//         'moment',
//         'validate',
//         'validate_local'
//     ],
//     function($, Backbone, Marionette, _, authSync, collection, models, moment) {
//         moment.locale('ru');
//
//         var app = {};
//
//         // var AlertMessage = Backbone.Marionette.View.extend({
//         //     template: _.template($('#alertbox-template').html()),
//         //     templateContext: function () {
//         //         return this.getOption('data')
//         //     }
//         // });
//         //
//         // app.LoginView = Backbone.Marionette.View.extend({
//         //     template: _.template($('#login-template').html()),
//         //     ui: {
//         //         email: 'input[name="email"]',
//         //         password: 'input[name="password"]',
//         //         btEnter: 'button[name="send"]'
//         //     },
//         //     events: {
//         //         'click @ui.btEnter': 'enterAction'
//         //     },
//         //     regions: {
//         //         alert: 'div[name="messages"]'
//         //     },
//         //     initialize: function () {
//         //         this.syncOb = new authSync.AuthSyncObj({
//         //             view: this
//         //         });
//         //         this.listenTo(this.syncOb, 'alert', function (data) {
//         //             this.showChildView('alert', new AlertMessage({data: data}));
//         //         }, this);
//         //
//         //         this.listenTo(this.syncOb, 'success', function (data) {
//         //             localStorage.accessKey = data;
//         //             Backbone.history.navigate('', {trigger: true});
//         //         }, this);
//         //
//         //     },
//         //     enterAction: function () {
//         //         var email = this.getUI('email').val().trim();
//         //         var password = this.getUI('password').val().trim();
//         //         this.syncOb.login(email, password);
//         //     }
//         // });
//         //
//         // app.SignUpView = Backbone.Marionette.View.extend({
//         //     template: _.template($('#signup-template').html()),
//         //     ui: {
//         //         email: 'input[name="email"]',
//         //         password: 'input[name="password"]',
//         //         btEnter: 'button[name="send"]'
//         //     },
//         //     events: {
//         //         'click @ui.btEnter': 'enterAction'
//         //     },
//         //     regions: {
//         //         alert: 'div[name="messages"]'
//         //     },
//         //     initialize: function () {
//         //         this.syncOb = new authSync.AuthSyncObj({
//         //             view: this
//         //         });
//         //         this.listenTo(this.syncOb, 'alert', function (data) {
//         //             this.showChildView('alert', new AlertMessage({data: data}));
//         //         }, this);
//         //
//         //         this.listenTo(this.syncOb, 'success', function (data) {
//         //             var data = {};
//         //             data.status = 'success';
//         //             data.message = 'Дополнительная информация вам выслана на email';
//         //             this.showChildView('alert', new AlertMessage({data: data}));
//         //         }, this);
//         //
//         //     },
//         //     enterAction: function () {
//         //         var email = this.getUI('email').val().trim();
//         //         var password = this.getUI('password').val().trim();
//         //         this.syncOb.signUp(email, password);
//         //     }
//         //
//         //
//         // });
//         //
//         // app.ResetPasswordView = Backbone.Marionette.View.extend({
//         //     template: _.template($('#reset-password-template').html()),
//         //     ui: {
//         //         email: 'input[name="email"]',
//         //         btEnter: 'button[name="send"]'
//         //     },
//         //     events: {
//         //         'click @ui.btEnter': 'enterAction'
//         //     },
//         //     regions: {
//         //         alert: 'div[name="messages"]'
//         //     },
//         //     initialize: function () {
//         //         this.syncOb = new authSync.AuthSyncObj({
//         //             view: this
//         //         });
//         //
//         //         this.listenTo(this.syncOb, 'alert', function (data) {
//         //             this.showChildView('alert', new AlertMessage({data: data}));
//         //         }, this);
//         //
//         //         this.listenTo(this.syncOb, 'success', function (data) {
//         //             var data = {};
//         //             data.status = 'success';
//         //             data.message = 'Информация по восстановлению выслана вам на email';
//         //             this.showChildView('alert', new AlertMessage({data: data}));
//         //         }, this);
//         //     },
//         //     enterAction: function () {
//         //         var email = this.getUI('email').val().trim();
//         //         this.syncOb.resetPassword(email, 'unused');
//         //     }
//         // });
//         //
//         // var HostView = Backbone.Marionette.View.extend({
//         //     template: _.template($('#hostitem-template').html()),
//         //     templateContext: function () {
//         //         return {moment: moment}
//         //     }
//         // });
//         //
//         // var HostListView = Backbone.Marionette.CollectionView.extend({
//         //     childView: HostView,
//         //     collectionEvents: {
//         //         'sync': function (data) {
//         //             this.triggerMethod('end:request');
//         //         },
//         //         'request': function () {
//         //             this.triggerMethod('start:request');
//         //         }
//         //     },
//         //     onRender: function () {
//         //         console.log('render');
//         //         this.collection.fetch();
//         //     }
//         // });
//         //
//         // app.IndexView = Backbone.Marionette.View.extend({
//         //     template: _.template($('#indexview-template').html()),
//         //     regions: {
//         //         hostList: 'div[name="host-list"]'
//         //     },
//         //     onRender: function () {
//         //         this.showChildView('hostList', new HostListView({
//         //             collection: new collection.HostCollection()
//         //         }) )
//         //     }
//         // });
//         //
//         // app.HostDetailView = Backbone.Marionette.View.extend({
//         //     template: _.template($('#hostdetailview-template').html()),
//         //     templateContext: function () {
//         //         return {moment: moment}
//         //     },
//         //     modelEvents: {
//         //         'change': 'render',
//         //     },
//         //     initialize: function (options) {
//         //         this.model = new models.HostModel({id: options.hostID});
//         //     },
//         //     onBeforeAttach: function () {
//         //         console.log('attached');
//         //         this.model.fetch();
//         //     }
//         // });
//         //
//         // app.HostAddView = Backbone.Marionette.View.extend({
//         //     template: _.template($('#hostaddview-template').html()),
//         //     ui: {
//         //         host: 'input[name="host"]',
//         //         btEnter: 'button[name="send"]'
//         //     },
//         //     events: {
//         //         'click @ui.btEnter': 'enterAction'
//         //     },
//         //     regions: {
//         //         alert: 'div[name="messages"]'
//         //     },
//         //     enterAction: function () {
//         //         var self = this;
//         //         var host = this.getUI('host').val().trim();
//         //         console.log(host);
//         //         if (!host) {
//         //             var data = {};
//         //             data.status = 'danger';
//         //             data.message = 'Не все поля заполнены';
//         //             this.showChildView('alert', new AlertMessage({data: data}));
//         //             return
//         //         }
//         //         var model = new models.HostModel({
//         //             host: host
//         //         });
//         //         model.save({}, {
//         //             success: function (model, response, options) {
//         //                 // console.log(model.toJSON());
//         //                 // console.log(response);
//         //                 data = {};
//         //                 if (options.xhr.responseJSON.ok) {
//         //                     data.status = 'success';
//         //                     data.message = 'Запрос на добавление принят';
//         //                     self.showChildView('alert', new AlertMessage({data: data}));
//         //                 } else {
//         //                     var codeError = options.xhr.responseJSON.error.code;
//         //                     var message = codeError;
//         //                     if (codeError == 435) {
//         //                         message = 'Неверный формат Host или IP.';
//         //                     }
//         //                     if (codeError == 436) {
//         //                         message = 'Host уже добавлен ранее.';
//         //                     }
//         //                     data.status = 'danger';
//         //                     data.message = message;
//         //                     self.showChildView('alert', new AlertMessage({data: data}));
//         //                 }
//         //             }
//         //         });
//         //     }
//         // });
//
//
//
//         return app;
//     }
// );
