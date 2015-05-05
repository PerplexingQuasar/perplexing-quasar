var AppView = Backbone.View.extend({


  className: 'container-fluid',

  initialize: function(){
    this.render();
    window.watch = new this.Watch(100,1000,function(){
      $('#popup').remove();
      window.watch.reset();
    });
  } ,

  render: function() {
    var that = this;
    this.model.get('rowCollection').each(function(row){
      var newRowView = new RowView({model: row})
      that.$el.append(newRowView.render());
    });

    // Append into the DOM
    $('body').empty().append( this.$el );
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
  }
});

