define([
    'underscore',
    'backbone',
    '../templates/mainFileCompareTemplate.html',
    './fileCompareView.js',
    '../lib/fileMatch.js',
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

        this.commonData1 = [];
        this.commonData2 = [];

        this.differentData1 = [];
        this.differentData2 = [];

        var fileData1 = fileObj.fileUploadView1.data;
        var fileData2 = fileObj.fileUploadView2.data;

        var matchingCount1 = this.matchingRecords(fileData1, fileData2);
        var matchingCount2 = this.matchingRecords(fileData2, fileData1);

        this.model1.set({
            'name': fileObj.fileUploadView1.file.name,
            'totalDataCount': fileObj.fileUploadView1.data.length,
            'kindOfMatchDataCount': matchingCount1.differentFieldMatchSmall.length,
            'notReallyMatchDataCount': matchingCount1.differentFieldMatchBig.length 
        });
        this.$("#loadCompareViews").append(this.fileCompareView1.render().$el);

        this.model2.set({
            'name': fileObj.fileUploadView2.file.name,
            'totalDataCount': fileObj.fileUploadView2.data.length,
            'kindOfMatchDataCount': matchingCount2.differentFieldMatchSmall.length,
            'notReallyMatchDataCount': matchingCount2.differentFieldMatchBig.length 
        });

        this.$("#loadCompareViews").append(this.fileCompareView2.render().$el);

        
        this.data.file1 = [matchingCount1.differentFieldMatchSmall, matchingCount1.differentFieldMatchBig, Object.keys(fileData1[0])];
        this.data.file2 = [matchingCount2.differentFieldMatchSmall, matchingCount2.differentFieldMatchBig, Object.keys(fileData2[0])];
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