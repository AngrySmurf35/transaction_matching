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

      Backbone.on("triggerCompareFile", this.triggerCompare);
      Backbone.on("triggerUnmatched", this.triggerUnmatched);
    },

    render: function() {
      this.$el.html(this.template({}));

      this.$("#fileUploadView").append(this.mainFileUploadView.render().$el);
      return this;
    },

    triggerCompare: function(fileObj) {
      var Model = new Backbone.Model();
      if (!this.mainFileCompareView)
        this.mainFileCompareView = new MainFileCompareView({model: Model});

      this.$("#fileCompareView").append(this.mainFileCompareView.render().$el);
      Backbone.trigger('triggerCompareView', fileObj);
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


