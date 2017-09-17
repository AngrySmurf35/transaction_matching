define([
    'underscore',
    'backbone',
    '../templates/fileCompareTemplate.html',
    '../lib/papaparse.min'
], function (_, Backbone, fileCompareTemplate, Papa) {

  return Backbone.View.extend({
    className: "twp_columns",
    template: _.template(fileCompareTemplate),

    initialize: function() {},

    render: function() {

      this.$el.html(this.template({
        'name': this.model.get("name") ? this.model.get("name") : '',
        'totalDataCount': this.model.get("totalDataCount"),
        'commonDataCount': this.model.get("commonDataCount"),
        'unmatchedDataCount': this.model.get("unmachedDataCount"),
      }));

      return this;
    }

  });
});