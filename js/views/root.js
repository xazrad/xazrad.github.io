/**
 * Created by radik on 05.11.17.
 */

define([
    'marionette',
    'views/auth',
    'views/hosts'
], function (Marionette, viewsAuth, viewsHosts) {
    var app = {};

    var NavBarView = Marionette.View.extend({
        tagName: 'ul',
        className: 'nav navbar-nav navbar-right',
        id: 'menu-top',
        onRender: function () {
            this.$('a').removeClass('menu-top-active');
            var fragment = Backbone.history.getFragment();
            this.$('a[href="#/'+fragment+'"]').addClass('menu-top-active');
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
            this.showChildView('navBar', new NavBarView({
                template: "#navbar-tmpl"
            }));
            this.showChildView('content', new viewsHosts.IndexView());
        },
        loginRoute: function () {
            localStorage.removeItem('accessKey');
            this.showChildView('navBar', new NavBarView({
                template: "#navbar-auth-tmpl"
            }));
            this.showChildView('content', new viewsAuth.LoginView());
        },
        resetPasswordRoute: function () {
            this.showChildView('navBar', new NavBarView({
                template: "#navbar-auth-tmpl"
            }));
            this.showChildView('content', new viewsAuth.ResetPasswordView());
        },
        hostAddRoute: function () {
            if (!localStorage.accessKey) {
                Backbone.history.navigate('login', {trigger: true});
                return;
            }
            this.showChildView('navBar', new NavBarView({
                template: "#navbar-tmpl"
            }));
            this.showChildView('content', new viewsHosts.HostAddView());
        },
        hostDetailRoute: function (hostID) {
            if (!localStorage.accessKey) {
                Backbone.history.navigate('login', {trigger: true});
                return;
            }
            this.showChildView('navBar', new NavBarView({
                template: "#navbar-tmpl"
            }));
            this.showChildView('content', new viewsHosts.HostDetailView({
                hostID: hostID
            }));
        },
        sessionsRoute: function () {
            if (!localStorage.accessKey) {
                Backbone.history.navigate('login', {trigger: true});
                return;
            }
            this.showChildView('navBar', new NavBarView({
                template: "#navbar-tmpl"
            }));
            // session-tmpl
        }
    });

    return app;

});
