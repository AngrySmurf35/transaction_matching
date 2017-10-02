define([
    'underscore',
    'backbone',
    '../templates/mainFileCompareTemplate.html',
    './fileCompareView.js',
    '../lib/bootstrap.css'
], function (_, Backbone, MainTemplate, FileCompareView) {

return Backbone.View.extend({
    className: "bs-callout bs-callout-primary flexBlock flexWrap mainViews",
    template: _.template(MainTemplate),

    events: {
        "click #report": "unmachedReport"
    },
    
    initialize: function() {
        this.data = {
            "file1": {},
            "file2": {}
        };
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
    
    triggerCompare: function(fileObj, matchingOn, fieldData) {
        var fileData1 = this.getUniqMatchingRecords(fileObj.fileUploadView1.data);
        var fileData2 = this.getUniqMatchingRecords(fileObj.fileUploadView2.data);

        this.matchingOn = matchingOn;
        this.fieldData = fieldData ? fieldData : {};

        var pickerValue1 = this.fieldData.pickerFile1 ? this.fieldData.pickerFile1.value : {};
        var pickerValue2 = this.fieldData.pickerFile2 ? this.fieldData.pickerFile2.value : {};

        this.model1.set({
            'name': fileObj.fileUploadView1.file.name,
            'totalDataCount': fileObj.fileUploadView1.data.length,
            'commonDataCount': this.matchingRecords(fileData1, fileData2, pickerValue1, pickerValue2).length,
            'unmachedDataCount': _.difference(fileObj.fileUploadView1.data, this.matchingRecords(fileData1, fileData2, pickerValue1, pickerValue2)).length
        });
        this.$("#loadCompareViews").append(this.fileCompareView1.render().$el);

        this.model2.set({
            'name': fileObj.fileUploadView2.file.name,
            'totalDataCount': fileObj.fileUploadView2.data.length,
            'commonDataCount': this.matchingRecords(fileData2, fileData1, pickerValue2, pickerValue1).length,
            'unmachedDataCount': _.difference(fileObj.fileUploadView2.data, this.matchingRecords(fileData2, fileData1, pickerValue2, pickerValue1)).length
        });
        this.$("#loadCompareViews").append(this.fileCompareView2.render().$el);

        this.data.file1 = { "unmachedData": _.difference(fileObj.fileUploadView1.data, this.matchingRecords(fileData1, fileData2, pickerValue1, pickerValue2)) };
        this.data.file2 = { "unmachedData": _.difference(fileObj.fileUploadView2.data, this.matchingRecords(fileData2, fileData1, pickerValue2, pickerValue1)) };
    },

    matchingRecords: function(fileData1, fileData2, pickerValue1, pickerValue2) {
        var commonData = [];
        if (!this.matchingOn) {
            _.find(fileData1, function(value1) {
                _.find(fileData2, function(value2) {
                    if(_.isEqual(value1, value2)) {
                         commonData.push(value1);
                    }
                });
            });
        
            return commonData;
        } else {
            // code for field matching goes here
            _.some(fileData1, function(value1) {
                _.some(fileData2, function(value2) {
                    if(value1[pickerValue1] && value2[pickerValue2] && _.isEqual(value1[pickerValue1], value2[pickerValue2]) && _.isEqual(value2[pickerValue2], value1[pickerValue1])) {
                         commonData.push(value1);
                    }
                });
            });
            return _.uniq(commonData, pickerValue1);
        }
    },

    getUniqMatchingRecords: function(object) {
        var data = _.uniq(object, function(item, index, object) {
            var returnedValue = '';
            _.each(Object.keys(item), function(val) {
                if (index < Object.keys(item).length)
                    returnedValue += item[val] + ' && ';
                else 
                    returnedValue += item[val];
            });
            return returnedValue;
        });

        return data;
    },

    unmachedReport: function() {
        Backbone.trigger("triggerUnmatched", this.data, this.matchingOn);
    }

  });

});