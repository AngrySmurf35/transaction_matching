define([
    'underscore',
    'backbone',
    '../templates/unmatchedReportTemplate.html',
    './fileCompareView.js',
    '../lib/bootstrap.css',
    '../lib/datatables/datatables.js',
    '../lib/datatables/datatables.css'
], function (_, Backbone, UnmatchedReportTemplate, FileCompareView) {

    return Backbone.View.extend({
        el: "<div>",
        className: "bs-callout bs-callout-primary flexBlock flexWrap",
        template: _.template(UnmatchedReportTemplate),

        initialize: function() {},

        render: function(data) {

            if (data.unmachedData.length) {
                this.$el.html(this.template());
                var column = [];
                _.each(Object.values(data), function(item) {
                    column.push(Object.keys(item[0]));
                });

                column[0] = _.filter(column[0], function(item) {
                    return item !== "__parsed_extra";
                });

                var columns = [];
                _.each(column[0], function(col, index) {
                    columns.push({'data': col, 'title': col});
                });

                var dataColumns = [];
                _.each(data.unmachedData, function(item) {
                    dataColumns.push(item);
                    delete item.__parsed_extra;
                });

                this.$('.unmachedReportTable').DataTable({
                    "data": dataColumns,
                    "columns": columns
                });
            }
            return this;
        }
    });
});