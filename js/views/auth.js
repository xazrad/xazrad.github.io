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
        submit: function (e) {
            if (!this.$('form').valid()) {
                return;
            }
            var data = this.$('form').serializeJSON();
            this.onSubmit(data, e);
        }
    });

    app.LoginView = BaseAuthView.extend({
        template: '#login-tmpl',
        onSubmit: function (data, e) {
            var name = $(e.currentTarget).attr('name');
            if (name == 'login') {
                this.syncOb.login(data);
            } else {
                this.syncOb.signUp(data);
            }
        },
        onSuccess: function (data) {
            if (data) {
                localStorage.accessKey = data;
                Backbone.history.navigate('', {trigger: true});
            } else {
                this.getUI('panel').removeClass('panel-danger');
                this.getUI('panel').addClass('panel-info');
                this.getUI('heading').html('Подтвердите ваш email');
            }
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
