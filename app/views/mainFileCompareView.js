define([
    'underscore',
    'backbone',
    '../templates/mainFileCompareTemplate.html',
    './fileCompareView.js',
    '../lib/fileMatch/fileMatch.js',
    '../lib/bootstrap.css'
], function (_, Backbone, MainTemplate, FileCompareView) {

return Backbone.View.extend({
    className: "bs-callout bs-callout-primary flexBlock flexWrap mainViews",
    template: _.template(MainTemplate),

    events: {
        "click #report": "unmachedReport"
    },
    
    initialize: function() {
        this.data = {"file1": {}, "file2": {}};
        Backbone.on("triggerCompareView", this.triggerCompare, this);
    },

    render: function() {
        this.$el.html(this.template({}));
        this.setModels();
        return this;
    },

    setModels: function() {
        this.model1 = this.model;
        this.model2 = this.model;

        this.fileCompareView1 = new FileCompareView({model: this.model1});
        this.fileCompareView2 = new FileCompareView({model: this.model2});
    },
    
    triggerCompare: function(fileObj) {

        var fileData1 = fileObj.fileUploadView1.data;
        var fileData2 = fileObj.fileUploadView2.data;

        var matchingCount1 = this.matchingRecords(fileData1, fileData2);
        var matchingCount2 = this.matchingRecords(fileData2, fileData1);

        this.model1.set({
            'name': fileObj.fileUploadView1.file.name,
            'totalDataCount': fileObj.fileUploadView1.data.length,
            'differentDataCount': matchingCount1.length
        });
        this.$("#loadCompareViews").append(this.fileCompareView1.render().$el);

        this.model2.set({
            'name': fileObj.fileUploadView1.file.name,
            'totalDataCount': fileObj.fileUploadView1.data.length,
            'differentDataCount': matchingCount1.length
        });

        this.$("#loadCompareViews").append(this.fileCompareView2.render().$el);

        this.data.file = [matchingCount1, Object.keys(fileData1[0])];
    },

    matchingRecords: function(fileData1, fileData2) {
        var fileMatch = new FileMatch(fileData1, fileData2);
        return fileMatch;
    },

    unmachedReport: function() {
        Backbone.trigger("triggerUnmatched", this.data);
    }

  });

});