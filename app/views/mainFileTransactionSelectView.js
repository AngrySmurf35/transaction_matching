define([
    'underscore',
    'backbone',
    '../templates/mainFileTransactionsSelectTemplate.html',
    './fileTransactionSelectView.js',
    '../lib/bootstrap.css'
], function (_, Backbone, MainFileTransactionSelectTemplate, FileTransactionSelectView) {
   
    return Backbone.View.extend({

        template: _.template(MainFileTransactionSelectTemplate),
        initialize: function() {
            this.fieldFilter = false;
            this.fileTransactionSelectView = new FileTransactionSelectView();
        },

        events: {
            "change #fieldMatching": "changeMatchingType"
        },

        render: function() {
            this.$el.html(this.template({}));
            this.$("#fieldMapping_file1").append(this.fileTransactionSelectView.render().$el);
            return this;
        },

        changeMatchingType: function() {
            this.fieldFilter = !this.fieldFilter;
            this.$("#fieldMapping_file1").toggle();
            Backbone.trigger('triggerSelectFiles', this.fieldFilter);
        }
    });

});