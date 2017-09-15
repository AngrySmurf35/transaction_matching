define([
    'underscore',
    'backbone',
    '../templates/mainFileCompareTemplate.html',
    './fileCompareView.js',
    '../lib/bootstrap.css'
], function (_, Backbone, MainTemplate, FileCompareView) {

return Backbone.View.extend({
    className: "bs-callout bs-callout-primary flexBlock flexWrap",
    template: _.template(MainTemplate),

    initialize: function() {
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

    destroy: function () {
        this.undelegateEvents();
        this.$el.removeData().unbind();
    },
    
    triggerCompare: function(fileObj) {
      
        this.matchingRecords(fileObj);
        this.model1.set('name', fileObj.fileUploadView1.file.name);
        this.$("#loadCompareViews").append(this.fileCompareView1.render().$el);

        this.model2.set('name', fileObj.fileUploadView2.file.name);
        this.$("#loadCompareViews").append(this.fileCompareView2.render().$el);
    },

    matchingRecords: function(fileObj) {
        var fileData1 = fileObj.fileUploadView1.data;
        var fileData2 = fileObj.fileUploadView2.data;
        
        var commonData = [];

        _.filter(fileData1, function(value1) {
            _.filter(fileData2, function(value2) {
                if(value1.TransactionID !== undefined && value1.TransactionID === value2.TransactionID) {
                    commonData.push(value1);
                }
            })
        });

        console.log(commonData);
    }

  });

});