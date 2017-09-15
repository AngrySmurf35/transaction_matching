define([
    'underscore',
    'backbone',
    '../templates/fileCompareTemplate.html',
    '../lib/papaparse.min'
], function (_, Backbone, fileCompareTemplate, Papa) {

  return Backbone.View.extend({
    className: "col-md-6",
    template: _.template(fileCompareTemplate),

    initialize: function() {
      Backbone.on("triggerCompare", this.triggerCompare, this);
      this.listenTo(this.model, "all", this.render);
    },

    render: function() {
      this.$el.html(this.template({
        'name': this.model.get("name") ? this.model.get("name") : ''
      }));

      return this;
    },
    
    triggerCompare: function(fileObj) {
      this.model.set('name', fileObj.fileUploadView1.file.name);
    }

  });
});