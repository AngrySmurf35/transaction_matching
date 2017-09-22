define([
    'underscore',
    'backbone',
    '../templates/fileTransactionSelectTemplate.html',
    '../lib/bootstrap.css',
    '../lib/dropdown.js',
], function (_, Backbone, FileTransactionSelectTemplate) {
   
    return Backbone.View.extend({

        template: _.template(FileTransactionSelectTemplate),
        initialize: function() {

        },

        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });

});