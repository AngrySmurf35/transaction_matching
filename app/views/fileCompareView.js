define([
    'underscore',
    'backbone',
    '../templates/fileCompareTemplate.html',
    '../lib/papaparse.min'
], function (_, Backbone, fileCompareTemplate, Papa) {

  return Backbone.View.extend({
    className: "bs-callout bs-callout-info col-md-5 insideView",
    template: _.template(fileCompareTemplate),

    initialize: function() {},

    render: function() {

      this.$el.html(this.template({
        'name': this.model.get("name") ? this.model.get("name") : '',
        'totalDataCount': this.model.get("totalDataCount"),
        'differentDataCount': this.model.get('differentDataCount')
      }));

      return this;
    }

  });
});