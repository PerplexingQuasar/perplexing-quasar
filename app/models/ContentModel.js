var ContentModel = Backbone.Model.extend({
  popup: function(){
    this.trigger('popup', this);
  }
});
