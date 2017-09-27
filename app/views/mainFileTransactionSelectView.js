define([
    'underscore',
    'backbone',
    '../templates/mainFileTransactionsSelectTemplate.html',
    './fileTransactionSelectView.js',
    '../lib/bootstrap.css'
], function (_, Backbone, MainFileTransactionSelectTemplate, FileTransactionSelectView) {
   
    return Backbone.View.extend({
        className: "form-group",
        template: _.template(MainFileTransactionSelectTemplate),
        initialize: function() {
            this.fieldFilter = false;
            Backbone.on("thisTriggerSelect", this.triggerFileSelect);
        },

        events: {
            "change #fieldMatching": "changeMatchingType"
        },

        render: function() {
            this.$el.html(this.template({}));
            return this;
        },

        triggerFileSelect: function(transactionHeaders, file) {
            if($(file).attr("id") == "file1") {
                if (!this.fileTransactionSelectView1) {
                    this.fileTransactionSelectView1 = new FileTransactionSelectView();
                }
                this.$("#fieldMapping_file1").append(this.fileTransactionSelectView1.render(transactionHeaders, "pickerFile1").$el);
            }
            if($(file).attr("id") == "file2") {
                if (!this.fileTransactionSelectView2) {
                    this.fileTransactionSelectView2 = new FileTransactionSelectView();
                }
                this.$("#fieldMapping_file1").append(this.fileTransactionSelectView2.render(transactionHeaders, "pickerFile2").$el);
            }
        },

        changeMatchingType: function() {
            this.fieldFilter = !this.fieldFilter;
            this.$("#fieldMapping_file1").toggle();
            Backbone.trigger('triggerSelectFiles', this.fieldFilter);
        }
    });

});