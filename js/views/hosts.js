/**
 * Created by radik on 06.11.17.
 */

define([
    'jquery',
    'backbone',
    'underscore',
    'marionette',
    'collections',
    'models',
    'checkTasks',
    'moment',
    'jquery-serializejson'

],function ($, Backbone, _, Marionette, collections, models, checkTasks,moment, validateOptions) {
    var app = {};
    moment.locale('ru');

    var HostView = Marionette.View.extend({
        className: 'row',
        template: '#hostitem-tmpl',
        templateContext: function () {
            return {moment: moment}
        }
    });

    var HostListView = Marionette.CollectionView.extend({
        childView: HostView,
        onRender: function () {
            this.collection.fetch();
        }
    });

    app.HostDetailView = Marionette.View.extend({
        template: '#host-tmpl',
        templateContext: function () {
            return {moment: moment}
        },
        modelEvents: {
            'change': 'render'
        },
        initialize: function (options) {
            this.model = new models.HostModel({id: options.hostID});
        },
        onBeforeAttach: function () {
            this.model.fetch();
        }
    });

    app.HostAddView = Backbone.Marionette.View.extend({
        template: '#host-add-tmpl',
        events: {
            'click button': 'submit'
        },
        ui: {
            heading: '.panel-heading',
            panel: '.panel'
        },
        initialize: function () {
            this.manager = new checkTasks.TaskManager();
            this.listenTo(this.manager, 'alert', function (percent) {
                console.log(percent);
                this.getUI('heading').html('<div class="progress progress-striped active"><div class="progress-bar progress-bar-primary" role="progressbar" style="width: '+ percent+ '%"></div></div>');
            }, this);
            this.listenTo(this.manager, 'error', function (percent) {
                this.getUI('panel').removeClass('panel-info');
                this.getUI('panel').addClass('panel-danger');
                this.getUI('heading').html('Ошибка дабавление');

            }, this);
            this.listenTo(this.manager, 'success', function (percent) {
                this.getUI('panel').removeClass('panel-info');
                this.getUI('panel').removeClass('panel-danger');
                this.getUI('panel').addClass('panel-success');
                this.getUI('heading').html('Домен добавлен');

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
            var host = data.host.trim();
            var model = new models.HostModel({
                host: host
            });
            var self = this;
            model.save({}, {
                success: function (model, response, options) {
                    data = {};
                    if (options.xhr.responseJSON.ok) {
                        self.manager.startChecks(options.xhr.responseJSON.result.subtasks);
                    } else {
                        var codeError = options.xhr.responseJSON.error.code;
                        var message = codeError;
                        if (codeError == 435) {
                            message = 'Неверный формат Host или IP.';
                        }
                        if (codeError == 436) {
                            message = 'Host уже добавлен ранее.';
                        }
                        self.getUI('panel').removeClass('panel-info');
                        self.getUI('panel').addClass('panel-danger');
                        self.getUI('heading').html(message);

                    }
                }
            });
        }

    });

    app.IndexView = Marionette.View.extend({
        template: '#indexview-tmpl',
        regions: {
            hostList: {
                el: 'div[name="host-list"]',
                replaceElement: true
            }
        },
        onRender: function () {
            this.showChildView('hostList', new HostListView({
                collection: new collections.HostCollection()
            }));
        }
    });

    return app;
});