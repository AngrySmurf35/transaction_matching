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

        render: function(data) {
                
            if (data.length) {
                this.$el.html(this.template());

                var columns = [];
                var cols = ['Fields with issues'].concat(data[2]);
                cols = cols.concat(data[2]);
                _.each(cols, function(col) {
                    columns.push({'title': col});
                });

                var dataColumns = [];
                _.each(data[0], function(item) {
                    dataColumns.push(item);
                });

                _.each(data[1], function(item) {
                    dataColumns.push(item);
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