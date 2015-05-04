var ContentModel = Backbone.Model.extend({
  popup: function(e){
    this.trigger('popup', this);
  }
});
