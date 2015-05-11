var PopView = Backbone.View.extend({

  className: 'hidden',
  id: 'popup',

  events: {
    'mouseenter': 'enter',
    'mouseleave': 'leave'
  },


  template: _.template(
       "<span id='arrow'></span>" +
       "<div id='popup-header'><h4><%- popupHeader %></h4></div>" +
       "<div id='popup-content'>Description: <%- popupContent %>" +
          "<hr>" +
          "<span class='tags'>Tags: <%- tags %></span>" +
       "</div>"
    ),

  initialize: function(options){
    this.render();
    this.popController(options.evt);
  },

  render: function() {
    //Removes previous popup if one exists
    $('#popup').remove();

    var textLength = 300;

    var contentText = this.model.get('description');
    if(contentText.length > textLength){
      contentText = contentText.slice(0,textLength);
      contentText += '...';
    }

    this.$el.html( this.template({
      popupHeader: this.model.get('name'),
      popupContent: contentText,
      tags: this.model.get('tags').join(', ')
    }));

    $('body').append(this.$el);
  },

  popController: function(e){
    // Prevent the DOM from Bubling up
    e.preventDefault();

    // Grab the popup's elements in the DOM
    var $popup = $('#popup');

    // Set up the function that will remove the .hidden class
    var openPopup = function(e){
      $popup.removeClass('hidden');
    };

    // window.cancel will store the SetTimeOut id to remove it from the event loop. The popup will open after 0.5 seconds.
    window.cancel = setTimeout(openPopup.bind(this, e), 200);

    // Invoke the function that will define the popup position
    this.popPosition(e,$popup);
  },

  popPosition: function(e, $popup){

    // Define the css object that contains the position of the Popup
    var cssObj={};
    // Define the size of the arrow
    var arrowWidth = 27;


    //offset.left is the location of the left edge of the div relative to the window
    //offset.top is the location of the top edge of the div relative to the window
    var offset = $(e.currentTarget).offset();

    //this is the width of the div
    offset.width = e.currentTarget.offsetWidth;

    //this is the width of the popup.
    var popWidth = $popup.width();

    //calculate the right edge of the popup (30 is the width of the popup's arrow)
    var popRightEdge = offset.left + offset.width + popWidth + arrowWidth ;

    //if the popup will appear off the right edge of the screen
    if( popRightEdge > window.innerWidth){
      //the popup will instead appear on the left side of the content

      //define popup positions
      cssObj.top = offset.top + 25;
      cssObj.left = offset.left - arrowWidth - popWidth;

      //orient the arrow to point the right way
      $('#arrow').removeClass('arrow-to-left');
      $('#arrow').addClass('arrow-to-right');

      //shift the arrow to the right-hand side of the popup by popWidth
      $('#arrow').css({ left: popWidth });

    }
    // Keep the popup at the right side of the content
    else{

      //define the popup positions
      cssObj.top = offset.top + 25;
      cssObj.left = offset.left + arrowWidth + offset.width;

      //orient the arrow to point the right way
      $('#arrow').removeClass('arrow-to-right');
      $('#arrow').addClass('arrow-to-left');

      //shift the arrow to the left-hand side of the popup by arrow width
      $('#arrow').css({ left: -arrowWidth });
    }

    // Set the position of the Popup
    $popup.css(cssObj);

    //EVENT LISTENERS on contentview
    $(e.currentTarget).on('mouseenter', function(e){
      e.preventDefault();
      window.watch.reset();
    });
    $(e.currentTarget).on('mouseleave', function(e){
      e.preventDefault();
      window.watch.start();
    });
  },
  //functions triggered by events on popupview
  enter: function(){
    window.watch.reset();
  },
  leave: function(){
    window.watch.start();
  }
});
