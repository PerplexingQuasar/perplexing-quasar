var ContentView = Backbone.View.extend({

  className: 'content',

  template: _.template(
      '<span class="content-img">' +
        //Git url link for the content
        '<a class="content-link" href=<%- contentUrl %>>' +
          //Give alt and src data
          '<img class="img" alt=<%- title %> src=<%- imgUrl %>>' +
        '</a>' +
      '</span>'
    ),

  events: {
    'mouseenter': 'popup'
  },

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html( this.template({
      title: this.model.get('title'), 
      imgUrl: this.model.get('thumbnail'),
      contentUrl: 'http://www.something.com'
    }) );

    return this.$el;
  },

  popup: function(e){
    // Grab the event object and send to the model
    this.model.popup(e);
  }
});
