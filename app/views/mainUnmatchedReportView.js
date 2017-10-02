define([
    'underscore',
    'backbone',
    '../templates/mainUnmatchedReportTemplate.html',
    '../views/unmatchedReportView.js',
    '../views/unmatchedReportFieldMatchView.js',
    './fileCompareView.js',
    '../lib/bootstrap.css',
    '../lib/datatables/datatables.js',
    '../lib/datatables/datatables.css'
], function (_, Backbone, MainUnmatchedReportTemplate, UnmatchedReportView, UnmatchedReportFieldMatchView, FileCompareView) {

    return Backbone.View.extend({
        el: "<div>",
        className: "mainViews",
        template: _.template(MainUnmatchedReportTemplate),
        initialize: function() {
            this.data = [];
            Backbone.on("triggerUnmatchedView", this.triggerCompare, this);
        },
        render: function() {
            this.$el.html(this.template());
            return this;
        },
        filterMatchingFields: function(data, fieldData) {
            console.log(data);
            console.log(fieldData);

            var fileColumns1 = Object.keys(data.file1.unmachedData[0]);
            var fileColumns2 = Object.keys(data.file2.unmachedData[0]);

            fileColumns1 = _.filter(fileColumns1, function(item) {
                return item !== "__parsed_extra" && item !== fieldData.pickerFile1.value;
            });

            fileColumns2 = _.filter(fileColumns2, function(item) {
                return item !== "__parsed_extra" && item !== fieldData.pickerFile2.value;
            });

            var fileColumns = fileColumns1.concat([fieldData.pickerFile1.value + '/' + fieldData.pickerFile2.value]);
            fileColumns = fileColumns.concat(fileColumns2);

            return fileColumns; // title columns
        },
        triggerCompare: function(data, matchingOn, fieldData) {
            this.$el.html(this.template());
            if (matchingOn) {
                var fileTitleColumns = this.filterMatchingFields(data, fieldData);
                if (!this.unmatchedReportFieldMatchView) {
                    this.unmatchedReportFieldMatchView = new UnmatchedReportFieldMatchView();
                }

                this.$("#table1").html(this.unmatchedReportFieldMatchView.render(data, fileTitleColumns, fieldData).$el);
            } else {
                if (!this.unmatchedReportView1) {
                    this.unmatchedReportView1 = new UnmatchedReportView();
                }
                
                if (!this.unmatchedReportView2) {
                    this.unmatchedReportView2 = new UnmatchedReportView();
                }
                this.$("#table1").html(this.unmatchedReportView1.render(data.file1).$el);
                this.$("#table2").html(this.unmatchedReportView2.render(data.file2).$el);
            }
        }
    });
});