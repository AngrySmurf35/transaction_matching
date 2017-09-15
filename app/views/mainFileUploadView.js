define([
    'underscore',
    'backbone',
    '../templates/mainFileUploadTemplate.html',
    './fileUploadView.js',
    '../lib/bootstrap.css',
], function (_, Backbone, MainTemplate, FileUploadView) {

return Backbone.View.extend({
    className: "bs-callout bs-callout-primary flexBlock flexWrap",
    template: _.template(MainTemplate),

    events: {
      'click #compare': 'compareResults'
    },

    initialize: function() {
      this.fileUploadView1 = new FileUploadView("file1");
      this.fileUploadView2 = new FileUploadView("file2");
    },

    render: function() {
      this.$el.html(this.template({}));

      this.$("#loadFileViews").append(this.fileUploadView1.render().$el);
      this.$("#loadFileViews").append(this.fileUploadView2.render().$el);
      return this;
    },

    compareResults: function() {
      Backbone.trigger('triggerCompare', this);
    }

  });

});


