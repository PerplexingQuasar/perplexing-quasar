var ContentModel = Backbone.Model.extend({
  popup: function(e){
    // Take the event object from content view and send to Content Collection
    // the first argument is the event and the second is the contentModel (this).
    // Subsequent arguments to trigger will be passed along to the event callbacks.
    // http://backbonejs.org/#Events-trigger
    this.trigger('popup', this, e);
  }
});
