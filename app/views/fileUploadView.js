define([
    'underscore',
    'backbone',
    '../templates/fileUploadTemplate.html',
    '../lib/papaparse.min'
], function (_, Backbone, fileUploadTemplate, Papa) {

  return Backbone.View.extend({
    className: "col-md-6 form-group",
    template: _.template(fileUploadTemplate),
    events: {
      'change .file': function(event) {
        if (this.isValidFile()) {
          this.parseData(event);
          this.error = "";
        } else {
          this.error = "Not a CSV file!";
        }
        this.render();
        this.displayFileName(event);
      }
    },

    initialize: function(id) {
        this.id = id;
        this.error;
        this.data = [];
        this.file = [];
    },

    render: function() {
      this.$el.html(this.template({
        fileId: this.id,
        error: this.error
      }));

      return this;
    },

    isValidFile: function() {
      var fileUpload = this.$("#" + this.id)[0].value && this.$("#" + this.id)[0].value != '' ? this.$("#" + this.id)[0] : this.$('.showFileName')[0];
      var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
      
      if (regex.test(fileUpload.value.toLowerCase())) {
        return true;
      }

      return false;
    },

    parseData: function(e) {
      var that = this;
      if(!e){ var e = window.event; }
      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function(results, file) {
         that.data = results.data;
         that.file = file;
         that.triggerFieldMatching(e);  
        }
      });
    },

    triggerFieldMatching: function(e) {
      var items = _.filter(Object.keys(this.data[0]), function(item) {
        return item !== "__parsed_extra";
      });
      Backbone.trigger("thisTriggerSelect", items, e.target);
    },

    displayFileName: function(event) {
      this.$(".showFileName").val(event.target.files[0].name);
    }
    
  });
});