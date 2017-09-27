define([
    'underscore',
    'backbone',
    './mainTemplate.html',
    './views/mainFileUploadView.js',
    './views/mainFileCompareView.js',
    './views/mainUnmatchedReportView.js',
    './lib/bootstrap.css',
    './css/styles.css'
], function (_, Backbone, MainTemplate, MainFileUploadView, MainFileCompareView, MainUnmatchedReportView) {

var MainView = Backbone.View.extend({
    el: '<div>',
    template: _.template(MainTemplate),

    initialize: function() {

      this.mainFileUploadView = new MainFileUploadView();

      Backbone.on('triggerSelectFiles', this.triggerSelectFiles);
      Backbone.on("triggerUnmatched", this.triggerUnmatched);
      Backbone.on('triggerPickerSelect', this.setPickerEvent);
      Backbone.on("triggerCompareFile", this.triggerCompare);
    },

    render: function() {
      this.$el.html(this.template({}));

      this.$("#fileUploadView").append(this.mainFileUploadView.render().$el);
      return this;
    },

    triggerSelectFiles: function(matchingOn) {
      // returns true if the field matching checkbox is checked
      this.matchingOn = matchingOn;
    },

    setPickerEvent: function(event) {
      if (!this.fieldData) {
        this.fieldData = {'pickerFile1': {}, 'pickerFile2': {}};
      }

      var fieldId = $(event.currentTarget).attr("id");
      // the value of the transaction
      if ($(event.currentTarget) && this.fieldData[fieldId]) {
        this.fieldData[$(event.currentTarget).attr("id")] = event.currentTarget;
      }
    },

    triggerCompare: function(fileObj) {
      var Model = new Backbone.Model();
      if (!this.mainFileCompareView)
        this.mainFileCompareView = new MainFileCompareView({model: Model});

      if (!this.matchingOn) {
        this.matchingOn = false;
      }

      this.$("#fileCompareView").append(this.mainFileCompareView.render().$el);
      Backbone.trigger('triggerCompareView', fileObj, this.matchingOn, this.fieldData);
    },

    triggerUnmatched: function(data) {
      if (!this.mainUnmatchedReportView)
        this.mainUnmatchedReportView = new MainUnmatchedReportView();
      
      this.$("#fileUnmatchedView").append(this.mainUnmatchedReportView.render().$el);
      Backbone.trigger('triggerUnmatchedView', data);
    },


  });

  var mainView = new MainView();
  $("#app").html(mainView.render().$el);

});


