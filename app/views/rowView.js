var RowView = Backbone.View.extend({

  template: _.template("<div class='row'><h3><%- rowName %></h3><section class='gallery'></section></div>"),

  initialize: function(){
    this.render();
  },

  render: function() {
    var that = this;
    this.model.get('contentCollection').each(function(content){
      var newContentView = new ContentView({model: content});
      // console.log(newContentView.render());
      that.$el.append(newContentView.render());
    });


    return this.$el.html(this.template( {rowName: this.model.get('name')} ) );
  }

});
