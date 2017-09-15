define([
    'underscore',
    'backbone',
    '../templates/mainFileCompareTemplate.html',
    './fileCompareView.js',
    '../lib/bootstrap.css',
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
      this.model1.set('name', fileObj.fileUploadView1.file.name);
      this.$("#loadCompareViews").append(this.fileCompareView1.render().$el);

      this.model2.set('name', fileObj.fileUploadView2.file.name);
      this.$("#loadCompareViews").append(this.fileCompareView2.render().$el);

      console.log(fileObj);
    }

  });

});