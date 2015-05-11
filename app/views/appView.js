var AppView = Backbone.View.extend({


  className: 'container-fluid',

  initialize: function(){
    window.watch = new this.Watch(100,1000,function(){
      $('#popup').remove();
      window.watch.reset();
    });
    this.render();

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

    //Footer
    $('.container-fluid').append('<div class="footer-buffer"></div>');
    var newFooterView = new FooterView();
    $('.footer-buffer').append(newFooterView.render());


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
        // console.log(this.currentTime);
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

