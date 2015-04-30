
var RowModel = Backbone.Model.extend({
  initialize: function(){
    this.set('contentCollection', new ContentCollection(contentData) );
  }
});
