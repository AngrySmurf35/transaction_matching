define([
    'underscore',
    'backbone',
    '../templates/mainFileUploadTemplate.html',
    './mainFileTransactionSelectView.js',
    './fileUploadView.js',
    '../lib/bootstrap.css',
], function (_, Backbone, MainTemplate, MainFileTransactionSelectView, FileUploadView) {

return Backbone.View.extend({
    className: "bs-callout bs-callout-primary flexBlock flexWrap mainViews",
    template: _.template(MainTemplate),

    events: {
      'click #compare': 'compareResults'
    },

    initialize: function() {
      this.fileUploadView1 = new FileUploadView("file1");
      this.fileUploadView2 = new FileUploadView("file2");
      this.mainFileTransactionSelectView = new MainFileTransactionSelectView();
    },

    render: function() {
      this.$el.html(this.template({}));

      this.$("#loadFileViews").append(this.fileUploadView1.render().$el);
      this.$("#loadFileViews").append(this.fileUploadView2.render().$el);
      this.$("#fieldMatchingViews").append(this.mainFileTransactionSelectView.render().$el);
      return this;
    },

    compareResults: function() {
      Backbone.trigger('triggerCompareFile', this);
    }

  });

});