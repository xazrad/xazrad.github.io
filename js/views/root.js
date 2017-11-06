/**
 * Created by radik on 05.11.17.
 */

define([
    'marionette',
    'views/auth'
], function (Marionette, viewsAuth) {
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
            this.showChildView('content', new viewsAuth.LoginView());
        },
        signupRoute: function () {
            localStorage.removeItem('accessKey');
            this.showChildView('navBar', new NavBarView());
            this.showChildView('content', new viewsAuth.SignUpView());
        },
        resetPasswordRoute: function () {
            this.showChildView('navBar', new NavBarView());
            this.showChildView('content', new viewsAuth.ResetPasswordView());
        },
        hostAddRoute: function () {

        },
        hostDetailRoute: function (hostID) {
            // HostDetailView
        }
    });

    return app;

});
