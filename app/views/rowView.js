var RowView = Backbone.View.extend({

  template: _.template("<div class='row'><h3><%- rowName %></h3></div>"),

  initialize: function(){
    this.render();
  },

  render: function() {
    return this.$el.html(this.template( {rowName: this.model.get('name')} ) );
  }

});
