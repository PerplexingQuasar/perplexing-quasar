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
    // Grab the event object and send to the model
    this.model.popup(e);
  }
});
