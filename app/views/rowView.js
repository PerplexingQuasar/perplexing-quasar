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
    
    var capName = this.model.get('name')[0].toUpperCase()+this.model.get('name').slice(1);
    this.$el.html(this.template( {rowName: capName} ) );

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
