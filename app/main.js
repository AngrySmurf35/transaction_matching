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
      Backbone.on("triggerCompareFile", this.triggerCompare);
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

      this.$("#fileCompareView").html(this.mainFileCompareView.render().$el);
      Backbone.trigger('triggerCompareView', fileObj);
    },

    triggerUnmatched: function(data) {
      var Model = new Backbone.Model();
      if (!this.mainUnmatchedReportView)
        this.mainUnmatchedReportView = new MainUnmatchedReportView({model: Model});
      
      this.$("#fileUnmatchedView").html(this.mainUnmatchedReportView.render().$el);
      Backbone.trigger('triggerUnmatchedView', data);
    }

  });

  var mainView = new MainView();
  $("#app").html(mainView.render().$el);

});


