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
        className: "mainViews",
        template: _.template(MainUnmatchedReportTemplate),
        initialize: function() {
            Backbone.on("triggerUnmatchedView", this.triggerCompare, this);
        },
        render: function() {
            this.$el.html(this.template());
            return this;
        },
        triggerCompare: function(data) {
            this.$el.html(this.template());

            this.model1 = this.model;
            this.model2 = this.model;
           
            this.model1.set("dfile", data.file1);
            this.model2.set("dfile", data.file2);

            if (!this.unmatchedReportView1) {
                this.unmatchedReportView1 = new UnmatchedReportView({model: this.model});
            }
            
            if (!this.unmatchedReportView2) {
                this.unmatchedReportView2 = new UnmatchedReportView({model: this.model});
            }

            this.$("#table1").html(this.unmatchedReportView1.render().$el);
            this.$("#table2").html(this.unmatchedReportView2.render().$el);
        }
    });
});