define([
    'underscore',
    'backbone',
    '../templates/unmatchedReportTemplate.html',
    './fileCompareView.js',
    '../lib/bootstrap.css',
    '../lib/datatables/datatables.js',
    '../lib/datatables/datatables.css',
    '../lib/datatables/DataTables-1.10.16/js/jquery.dataTables.js',
    '../lib/datatables/DataTables-1.10.16/js/dataTables.bootstrap.min.js',
    '../lib/datatables/dataTables.responsive.min.js',
    '../lib/datatables/responsive.dataTables.min.css',
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
                var cols = ["Suggestions", "File 1"];

                cols = cols.concat(this.model.get("dfile")[1]);
                cols = cols.concat(["File 2"]);
                cols = cols.concat(this.model.get("dfile")[1]);
                _.each(cols, function(col) {
                    columns.push({'title': col});
                });

                // data in table
                var dataColumns = [];
                _.each(this.model.get("dfile")[0], function(item, index) {
                    dataColumns.push(item);
                });

                // table render
                var table = this.$('.unmachedReportTable').DataTable({
                    "data": dataColumns,
                    "columns": columns,
                    "responsive": true,
                    'rowCallback': function(row, data, index){
                        _.each(data, function(val, index) {

                            // highligh the values that have issues
                            if ((data[1].includes(data[index]) || data[((data.length+1)/2)].includes(data[index])) && !Array.isArray(data[index])) {
                                row.children[index].className = "diffElements";
                            }
                            if (Array.isArray(data[index]) && index != 0) {
                                row.children[index].className = "differencesHighligh";
                                row.children[index].className = 'notVisible';
                                if ((data[index].length >= row.childNodes.length/2-4)) {
                                    row.className = "veryDifferentElements";
                                }
                            }
                        });
                    }
                }).columns.adjust().responsive.recalc();;
            }
            return this;
        }
    });
});