var PopView = Backbone.View.extend({

  className: 'hidden',
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

    this.fuck();

    $('body').append(this.$el);
  },

  fuck: function(){
    // Grab the popup in the DOM
    var $popup = $('#popup');

    // Set up the function that will remove the .hidden class
    var openPopup = function(e){
      $popup.removeClass('hidden');
    }

    // the popup will open after 0.5 seconds
    window.cancel = setTimeout(openPopup.bind(this, e), 500);
  }
});
