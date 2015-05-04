var ContentView = Backbone.View.extend({

  className: 'content',

  events: {
    'mouseenter': 'popup'
  },

  initialize: function(){
    this.render();
  },

  render: function(){
    return this.$el;
  },

  popup: function(e){
    this.model.popup(e);
  }
});
