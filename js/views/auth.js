/**
 * Created by radik on 05.11.17.
 */

define([
    'marionette',
    'authSync',
    'validate.options',
    'jquery-serializejson'

], function (Marionette, authSync, validateOptions) {
    var app = {};

    var BaseAuthView = Marionette.View.extend({
        events: {
            'click button': 'submit'
        },
        ui: {
            heading: '.panel-heading',
            panel: '.panel'
        },
        initialize: function () {
            this.syncOb = new authSync.AuthSyncObj({view: this});
            this.listenTo(this.syncOb, 'alert', function (data) {
                this.getUI('panel').removeClass('panel-info');
                this.getUI('panel').addClass('panel-danger');
                this.getUI('heading').html(data.message);
            }, this);

            this.listenTo(this.syncOb, 'success', function (data) {
                this.onSuccess(data);
            }, this);
        },
        onRender: function () {
            this.$('form').validate(validateOptions);
        },
        submit: function () {
            if (!this.$('form').valid()) {
                return;
            }
            var data = this.$('form').serializeJSON();
            this.onSubmit(data);
        }
    });

    app.LoginView = BaseAuthView.extend({
        template: '#login-tmpl',
        onSubmit: function (data) {
            this.syncOb.login(data);
        },
        onSuccess: function (data) {
            localStorage.accessKey = data;
            Backbone.history.navigate('', {trigger: true});
        }
    });

    app.SignUpView = BaseAuthView.extend({
        template: '#signup-tml',
        onSubmit: function (data) {
            this.syncOb.signUp(data);
        },
        onSuccess: function () {
            this.getUI('panel').removeClass('panel-danger');
            this.getUI('panel').addClass('panel-info');
            this.getUI('heading').html('Информация по восстановлению выслана вам на email');
        }
    });

    app.ResetPasswordView = BaseAuthView.extend({
        template: '#reset-password-tml',
        onSubmit: function (data) {
            this.syncOb.resetPassword(data);
        },
        onSuccess: function () {
            this.getUI('panel').removeClass('panel-danger');
            this.getUI('panel').addClass('panel-info');
            this.getUI('heading').html('Информация по восстановлению выслана вам на email');
        }
    });

    return app;
});
