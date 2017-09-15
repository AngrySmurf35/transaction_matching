define([
    'underscore',
    'backbone',
    './mainTemplate.html',
    './views/mainFileUploadView.js',
    './views/mainFileCompareView.js',
    './lib/bootstrap.css',
    './css/styles.css'
], function (_, Backbone, MainTemplate, MainFileUploadView, MainFileCompareView) {

var MainView = Backbone.View.extend({
    el: '<div>',
    template: _.template(MainTemplate),

    initialize: function() {
      this.mainFileUploadView = new MainFileUploadView();

      Backbone.on("triggerCompare", this.triggerCompare);
    },

    render: function() {
      this.$el.html(this.template({}));

      this.$("#fileUploadView").append(this.mainFileUploadView.render().$el);

      return this;
    },

    triggerCompare: function(fileObj) {
      var Model = new Backbone.Model();
      this.mainFileCompareView = new MainFileCompareView({model: Model});
      
      this.$("#fileCompareView").empty();
      this.mainFileCompareView.destroy();
      
      this.$("#fileCompareView").append(this.mainFileCompareView.render().$el);
      Backbone.trigger('triggerCompareView', fileObj);
    }

  });

  var mainView = new MainView();
  $("#app").html(mainView.render().$el);

});


