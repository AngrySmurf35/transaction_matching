define([
    'underscore',
    'backbone',
    '../templates/fileTransactionSelectTemplate.html',
    '../lib/bootstrap.css',
    '../lib/dropdown.js',
], function (_, Backbone, FileTransactionSelectTemplate) {
   
    return Backbone.View.extend({
        className: "form-group",
        template: _.template(FileTransactionSelectTemplate),
        initialize: function() {},
        events: {
            "change .selectpicker": "changeMapping"
        },

        render: function(transactionHeader, id) {
            this.$el.html(this.template({
                transactionHeader: transactionHeader,
                id: id
            }));
        
            return this;
        },

        changeMapping: function(event) {
            Backbone.trigger('triggerPickerSelect', event);
        }
    });

});