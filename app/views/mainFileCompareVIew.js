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

    events: {
        
    },

    initialize: function() {
        var Model = new Backbone.Model({});
        this.fileCompareView1 = new FileCompareView({model: Model});
        this.fileCompareView2 = new FileCompareView({model: Model});
    },

    render: function() {
        this.$el.html(this.template({}));

        this.$("#loadCompareViews").append(this.fileCompareView1.render().$el);
        this.$("#loadCompareViews").append(this.fileCompareView2.render().$el);
        return this;
    },

    compareResults: function() {
        Backbone.trigger("changeTrigger", this);
    }

  });

});