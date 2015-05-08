var AppModel = Backbone.Model.extend({
  initialize: function(){
    console.log(window.data);
    this.set('rowCollection', new RowCollection(data.header) );
    // console.dir(this.get('rowCollection'));
  }
});

var ContentModel = Backbone.Model.extend({
  popup: function(e){
    // Take the event object from content view and send to Content Collection
    // the first argument is the event and the second is the contentModel (this).
    // Subsequent arguments to trigger will be passed along to the event callbacks.
    // http://backbonejs.org/#Events-trigger
    this.trigger('popup', this, e);
  }
});


var RowModel = Backbone.Model.extend({
  initialize: function(){
    var row = data.content[this.get('name')];
    this.set('contentCollection', new ContentCollection(row) );
  }
});


var ContentCollection = Backbone.Collection.extend({
  model: ContentModel,

  initialize: function(){
    // Listen to content model's popup event
    this.on('popup', function(m, e){
      // m -> model and e-> event object
      // pass the event object as popview's property.
      var newPopView = new PopView({model: m, evt: e});
    });
  }
});


var RowCollection = Backbone.Collection.extend({
  model: RowModel
});

var AppView = Backbone.View.extend({


  className: 'container-fluid',

  initialize: function(){
    this.render();
    window.watch = new this.Watch(100,1000,function(){
      $('#popup').remove();
      window.watch.reset();
    });

    /////////////////////////////////////////////////
    //Initialize and set options for our header
    /////////////////////////////////////////////////
    //play with options
    Headroom.options.offset = 40;
    Headroom.options.tolerance = {
      down: 5,
      up: 50
    };
    //asign the headroom to the DOM element.
    $(".headroom").headroom();

    //Apply the settings value from data to the css. 
    $('.content').css({ //for all DOM element of class '.content'
      //create property/change values
      'width': data.settings.contentWidth + 'px',
      'height': data.settings.contentHeight + 'px'
    });

    /////////////////////////////////////////////////
    //Initialize SmoothDivScroll to the DOM element
    /////////////////////////////////////////////////
    $('.gallery').smoothDivScroll({
        manualContinuousScrolling: true
      }).smoothDivScroll('move', 30).smoothDivScroll('move', -30);


    //Here we create append the link element to the html for dynamic css style types.
    //arguement should be a string, name of css file. 
    //this.loadCSS(data.cssStyle); 


  },

  render: function() {
    var that = this;
    this.model.get('rowCollection').each(function(row){
      var newRowView = new RowView({model: row});
      that.$el.append(newRowView.render());
    });

    $body = $('body');
    $body.empty();
    // Append into the DOM
    $body.append( this.$el );

    //Add header
    $('.container-fluid').prepend('<div class="header-buffer"></div>');
    var newHeaderView = new HeaderView();
    $('.header-buffer').append(newHeaderView.render());




//this.watch = new this.Watch(100,5000,function(){console.log(this.currentTime);});
  },
  //make a timer for the popup
  Watch: function(cycleTime, timeLimit, callback) {
    // Define the global variable with the total time
    this.currentTime = 0;
    this.timeLimit =  timeLimit || 3000;

    // Variable responsible by defining whether the cronometer is on or not
    var interval;

    // Start the cronometer
    this.start = function(){
        if (!interval){
            interval = setInterval(this.addTime.bind(this), cycleTime || 500);
        }
      };

    // Stop the cronometer
    this.stop = function(){
        if (interval){
          clearInterval(interval);
          interval = null;
        }
        return this;
      };

    // Reset the cronometer
    this.reset = function(){
        this.currentTime = 0;
        this.stop();
        return this;
      };

    this.do = function(){
      callback();
    };

    // Increment seconds to the cronometer
    this.addTime = function(){
        this.currentTime += cycleTime;
        if (this.currentTime >= this.timeLimit ) {
          this.do();
        }
      };
  },

  loadCSS: function (style){
    //simple check if that css is loaded/exists already
    if(!document.getElementById(style + '-css')){
      //Get the head
      var head = document.getElementsByTagName('head')[0];
      //create the link DOM element
      var link  = document.createElement('link');
      //assign information to new link
      link.id   = style + '-css'; //the element id
      link.rel  = 'stylesheet';  //a stylesheet
      link.type = 'text/css';   //of type css
      link.href = 'styles/' + style + '.css'; //the url path to that css file
      //finally, append new link to the head
      head.appendChild(link);
    }
  }
});


var ContentView = Backbone.View.extend({

  className: 'content',

  template: _.template(
      '<span class="content-img">' +
        //Git url link for the content
        '<a class="content-link" href=<%- contentUrl %>>' +
          //Give alt and src data
          '<img class="img" src=<%- imgUrl %>>' +
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
      contentUrl: this.model.get('link')
    }) );

    return this.$el;
  },

  popup: function(e){
    // Grab the event object and send to the model
    this.model.popup(e);
  }
});

var HeaderView = Backbone.View.extend({

  template: _.template(
    '<a href=<%- url %> ><h4 id="display-title"><span id="displaybase">DisplayBase</span>' +
    '<span id="js">.js</span></h4></a>' +
    '<a href="https://github.com/PerplexingQuasar/perplexing-quasar">' +
      '<i class="fa fa-github"></i>' +
    '</a>'
    ),
  className: 'headroom',
  id:'headroom',
  intialize: function(){
    this.render();
  },
  render: function(){

    //Change the object value to whatever we want the link to be.
    this.$el.html(this.template({url: ''}));


    return this.$el;
  }
});

var PopView = Backbone.View.extend({

  className: 'hidden',
  id: 'popup',

  events: {
    'mouseenter': 'enter',
    'mouseleave': 'leave'
  },


  template: _.template(
       "<span id='arrow'></span>" +
       "<div id='popup-header'><%- popupHeader %></div>" +
       "<div id='popup-content'><%- popupContent %></div>"
    ),

  initialize: function(options){
    this.render();
    this.popController(options.evt);
  },

  render: function() {
    //Removes previous popup if one exists
    $('#popup').remove();

    this.$el.html( this.template({
      popupHeader: this.model.get('title'),
      popupContent: this.model.get('description')
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
    }

    // window.cancel will store the SetTimeOut id to remove it from the event loop. The popup will open after 0.5 seconds.
    window.cancel = setTimeout(openPopup.bind(this, e), 500);

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
    $(e.currentTarget).on('mouseleave', function(e){
      e.preventDefault();
      window.watch.start();
    });
    $(e.currentTarget).on('mouseenter', function(e){
      e.preventDefault();
      window.watch.reset();
    });
  },
  //functions triggered by events on popupview
  enter: function(){
    window.watch.reset();
    console.log("entered popup");
  },
  leave: function(){
    window.watch.start();
    console.log("left popup");
  }
});

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
    this.$el.html(this.template( {rowName: this.model.get('name')} ) );

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
