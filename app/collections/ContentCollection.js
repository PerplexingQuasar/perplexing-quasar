
var ContentCollection = Backbone.Collection.extend({
  model: ContentModel,

  initialize: function(){
    this.on('popup', function(m){
      // console.log(m);
      var newPopView = new PopView({model: m});
    });
  }
});
