
var ContentCollection = Backbone.Collection.extend({
  model: ContentModel,

  initialize: function(){
    // Listen to content model's popup event
    this.on('popup', function(m, e){
      // m -> model and e-> event object

      // pass the event object as popview's property.
      var newPopView = new PopView({model: m, options: {'event': e}});
    });
  }
});
