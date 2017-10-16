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
                var cols = ["File 1"].concat(this.model.get("dfile")[1]);
                cols = cols.concat(["File 2"]);
                cols = cols.concat(this.model.get("dfile")[1]);
                _.each(cols, function(col) {
                    columns.push({'title': col});
                });

                var dataColumns = [];
                _.each(this.model.get("dfile")[0].differentFieldMatchSmall, function(item, index) {
                    dataColumns.push(item);
                });

                _.each(this.model.get("dfile")[0].differentFieldMatchBig, function(item, index) {
                    dataColumns.push(item);
                });

                _.each(this.model.get("dfile")[0].differentFieldMatchCompletly, function(item, index) {
                    dataColumns.push(item);
                });

                var table = this.$('.unmachedReportTable').DataTable({
                    "data": dataColumns,
                    "columns": columns,
                    'rowCallback': function(row, data, index){
                        _.each(data, function(val, index) {
                            // highligh the values that have issues
                            if ((data[0].includes(data[index]) || data[(data.length/2)].includes(data[index])) && !Array.isArray(data[index])) {
                                row.children[index].className = "diffElements";
                            }
                            if (Array.isArray(data[index])) {
                                row.children[index].className = "differencesHighligh";
                                row.children[index].className = 'notVisible';
                                if ((data[index].length >= row.childNodes.length/2-3)) {
                                    row.className = "veryDifferentElements";
                                }
                            }
                        });
                    }
                });
            }
            return this;
        }
    });
});