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

        render: function() {
            if (this.model.get("dfile").length) {
                this.$el.html(this.template());

                var columns = [];
                var cols = this.model.get("dfile")[2].concat(["Difference with file two"]);
                cols = cols.concat(["Difference with file one"]);
                cols = cols.concat(this.model.get("dfile")[2]);
                _.each(cols, function(col) {
                    columns.push({'title': col});
                });

                var dataColumns = [];
                _.each(this.model.get("dfile")[0], function(item) {
                    dataColumns.push(item);
                });

                _.each(this.model.get("dfile")[1], function(item) {
                    dataColumns.push(item);
                });

                this.$('.unmachedReportTable').DataTable({
                    "data": dataColumns,
                    "columns": columns,
                    'rowCallback': function(row, data, index){
                        _.each(data, function(val, index) {
                            // highligh the values that have issues
                            if ((data[(data.length/2)-1].includes(data[index]) || data[(data.length/2)].includes(data[index])) && !Array.isArray(data[index])) {
                                row.children[index].className = "diffElements";
                            }

                            if (Array.isArray(data[index])) {
                                row.children[index].className = "differencesHighligh";
                            }
                        });
                    }
                });
            }
            return this;
        }
    });
});