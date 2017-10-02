define([
    'underscore',
    'backbone',
    '../templates/unmatchedReportTemplate.html',
    './fileCompareView.js',
    '../lib/bootstrap.css',
    '../lib/datatables/datatables.js',
    '../lib/datatables/datatables.css',
    '../lib/datatables/datatables.boostrap.min.css'
], function (_, Backbone, UnmatchedReportTemplate, FileCompareView) {

    return Backbone.View.extend({
        el: "<div>",
        className: "bs-callout bs-callout-primary flexBlock flexWrap mainViews",
        template: _.template(UnmatchedReportTemplate),

        initialize: function() {},
        render: function(data, fileColumns, fieldData) {
            
        if (data.file1.unmachedData.length && data.file2.unmachedData.length) {

            var fileColumns1 = [];
            var fileColumns2 = [];

            _.each(Object.values(data.file1.unmachedData), function(item) {
                delete item.__parsed_extra;
                fileColumns1.push(Object.values(item));
            });

            _.each(Object.values(data.file2.unmachedData), function(item) {
                delete item.__parsed_extra;
                fileColumns2.push(Object.values(item));
            });

        

           /* var fileColumns = fileColumns1.concat([fieldData.pickerFile1.value + '/' + fieldData.pickerFile2.value]);
            fileColumns = fileColumns.concat(fileColumns2);*/

            this.$('.unmachedReportTable').DataTable({
                "data": dataColumns,
                "columns": fileColumns
            });
        }
        return this;
    }
    });
});