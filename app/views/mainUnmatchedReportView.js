define([
    'underscore',
    'backbone',
    '../templates/mainUnmatchedReportTemplate.html',
    '../views/unmatchedReportView.js',
    './fileCompareView.js',
    '../lib/bootstrap.css',
    '../lib/datatables/datatables.js',
    '../lib/datatables/datatables.css'
], function (_, Backbone, MainUnmatchedReportTemplate, UnmatchedReportView, FileCompareView) {

    return Backbone.View.extend({
        el: "<div>",
        className: "bs-callout bs-callout-primary flexBlock flexWrap",
        template: _.template(MainUnmatchedReportTemplate),
        initialize: function() {
            if (!this.unmatchedReportView1)
            this.unmatchedReportView1 = new UnmatchedReportView();
            
            if (!this.unmatchedReportView2)
            this.unmatchedReportView2 = new UnmatchedReportView();
            this.data = [];
            Backbone.on("triggerUnmatchedView", this.triggerCompare, this);
        },
        render: function() {
            this.$el.html(this.template());
            return this;
        },
        triggerCompare: function(data) {
            this.$el.html(this.template());
                this.$("#table1").html(this.unmatchedReportView1.render(data.file1).$el);
                this.$("#table2").html(this.unmatchedReportView2.render(data.file2).$el);
        }
    });
});