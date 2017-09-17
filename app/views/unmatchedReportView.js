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

        initialize: function(info) {
            Backbone.on("triggerUnmatchedView", this.triggerCompare, this);
        },

        render: function(data) {
            this.$el.html(this.template());

            console.log(data);

            var dataSet =  [{ 
                    "name": "1",
                    "position": "2" ,
                    "office": "3" ,
                    "extn": "4." ,
                    "start_date": "5 date" ,
                    "salary": "5" 
                },
             { 
                "name": "1",
                "position": "2" ,
                "office": "3" ,
                "extn": "4." ,
                "start_date": "5 date" ,
                "salary": "5" 
            },];

            this.$('#unmachedReportTable').DataTable({
                "data":dataSet,
                "columns": [
                    { "data": "name" },
                    { "data": "position" },
                    { "data": "office" },
                    { "data": "extn" },
                    { "data": "start_date" },
                    { "data": "salary" }
                ]
            });
            return this;
        },

        triggerCompare: function(data) {
            this.render(data);
        }
    });
});