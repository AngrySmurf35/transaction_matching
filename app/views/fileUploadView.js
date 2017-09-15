define([
    'underscore',
    'backbone',
    '../templates/fileUploadTemplate.html',
    '../lib/papaparse.min'
], function (_, Backbone, fileUploadTemplate, Papa) {

  return Backbone.View.extend({
    className: "form-group",
    template: _.template(fileUploadTemplate),
    events: {
      'change .file': function() {
        this.parseData();
        this.displayFileName();
      }

    },
    initialize: function(id) {
        this.id = id;
        this.data = [];
        this.file = [];   
    },

    render: function() {
      this.$el.html(this.template({
        fileId: this.id
      }));

      return this;
    },

    parseData: function() {
      var that = this;
      Papa.parse(event.target.files[0], {
        header: true,
        complete: function(results, file) {
          that.data = results.data;
          that.file = file;
        }
      });
    },

    displayFileName: function() {
      this.$(".showFileName").val(event.target.files[0].name);
    }
    
  });
});