/**
 * Created by radik on 26.09.17.
 */


define([
        'jquery',
        'backbone',
        'underscore',
        'marionette'
    ],
    function($, Backbone, _) {
        var app = {};

        var LoadingView = Backbone.Marionette.View.extend({
            template: '#loading'
        });

        var LoadingDoneView = Backbone.Marionette.View.extend({
            template: '#loadingDone',
            templateContext: function () {
                return {data: this.getOption('data')};
            }
        });

        app.Content = Backbone.Marionette.View.extend({
            el: '#content',
            template: _.noop,
            regions: {
                body: '.grid_16'
            },
            collectionEvents: {
                'sync': function () {
                    var data = this.collection.toJSON();
                    console.log(data);
                    console.log('Прогрузили');
                    this.showChildView('body', new LoadingDoneView({
                        data: data
                    }));
                }
            },
            onRender: function () {
                this.showChildView('body', new LoadingView());
                this.collection.fetch();
            }
        });

        return app;
    }
);
