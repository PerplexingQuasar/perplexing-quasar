var RowView = Backbone.View.extend({
  className: "row",
  template: _.template("<h3><%- rowName %></h3><section class='gallery'></section>"),

  initialize: function(){
    this.render();
  },

  render: function() {
    // Memorize the view scope
    var that = this;
    // generate inside the "el" the template nodes (with the gallery class)
    this.$el.html(this.template( {rowName: this.model.get('name')} ) )

    // iterate over all the collection and for each content (model)
    this.model.get('contentCollection').each(function(content){
      // instantiate the ContentView
      var newContentView = new ContentView({model: content});
      // append the view to .gallery
      that.$(".gallery").append(newContentView.render());
    });

    return this.$el;
  }

});
