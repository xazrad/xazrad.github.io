


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
