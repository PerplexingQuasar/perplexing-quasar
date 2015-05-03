var RowView = Backbone.View.extend({
  className: "row",
  template: _.template("<h3><%- rowName %></h3><section class='gallery'></section>"),

  initialize: function(){
    this.render();
  },

  render: function() {
    var that = this;
    this.$el.html(this.template( {rowName: this.model.get('name')} ) )

    this.model.get('contentCollection').each(function(content){
      var newContentView = new ContentView({model: content});
      that.$(".gallery").append(newContentView.render());
    });


    return this.$el;
  }

});
