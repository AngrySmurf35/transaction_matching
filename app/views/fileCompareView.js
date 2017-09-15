define([
    'underscore',
    'backbone',
    '../templates/fileCompareTemplate.html',
    '../lib/papaparse.min'
], function (_, Backbone, fileCompareTemplate, Papa) {

  return Backbone.View.extend({
    className: "col-md-6",
    template: _.template(fileCompareTemplate),

    initialize: function() {},

    render: function() {
      this.$el.html(this.template({
        'name': this.model.get("name") ? this.model.get("name") : ''
      }));

      return this;
    }

  });
});