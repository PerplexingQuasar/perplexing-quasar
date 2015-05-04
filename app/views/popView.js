var PopView = Backbone.View.extend({

  // className: 'hidden',
  id: 'popup',

  template: _.template(
       "<span id='arrow'></span>" +
       "<div id='popup-header'><%- popupHeader %></div>" +
       "<div id='popup-content'><%- popupContent %></div>"
    ),

  initialize: function(){

    this.render();
  },

  render: function() {
    //Removes previous popup if exists
    $('#popup').remove();

    this.$el.html( this.template({
      popupHeader: this.model.get('title'),
      popupContent: this.model.get('description')
    }));

    $('body').append(this.$el);
  }
});
