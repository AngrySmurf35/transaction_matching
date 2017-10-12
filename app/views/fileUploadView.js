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
      if(!e){ var e = window.event; }
      Papa.parse(e.target.files[0], {
        header: true,
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

    displayFileName: function() {
      this.$(".showFileName").val(event.target.files[0].name);
    }
    
  });
});