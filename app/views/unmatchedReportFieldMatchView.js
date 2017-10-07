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
            this.$el.html(this.template());
            var fileColumns1 = [];
            var fileColumns2 = [];

            var currentMatchingField1 = fieldData.pickerFile1.value;
            var currentMatchingField2 = fieldData.pickerFile2.value;

            _.each(Object.values(data.file1.unmachedData), function(item) {
                delete item.__parsed_extra;
                delete item[currentMatchingField1];
                fileColumns1.push(Object.values(item));
            });

            _.each(Object.values(data.file2.unmachedData), function(item) {
                delete item.__parsed_extra;
                delete item[currentMatchingField2];
                fileColumns2.push(Object.values(item));
            });

            var dataColumns = [];
            _.each(fileColumns1, function(item, index) {
                dataColumns[index] = fileColumns1[index].concat([currentMatchingField1 + '/' + currentMatchingField2]);
                dataColumns[index] = dataColumns[index].concat(fileColumns2[index]);
            });

            console.log(fileColumns);
            console.log(dataColumns);
            this.$('.unmachedReportTable').empty();
            this.$('.unmachedReportTable').DataTable({
                "data": dataColumns,
                "columns": fileColumns,
                "rowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    if(aData[iDisplayIndex] == currentMatchingField1 + '/' + currentMatchingField2){
                        $('th:contains(' + aData[iDisplayIndex]  + ')').addClass("redBackground");
                    }
                }
            });
        }
        return this;
    }
    });
});