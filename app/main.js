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
      this.mainFileCompareView = new MainFileCompareView();
    },

    render: function() {
      this.$el.html(this.template({}));

      this.$("#fileUploadView").append(this.mainFileUploadView.render().$el);
      this.$("#fileCompareView").append(this.mainFileCompareView.render().$el);

      return this;
    },

  });

  var mainView = new MainView();
  $("#app").html(mainView.render().$el);

});


