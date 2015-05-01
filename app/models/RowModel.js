
var RowModel = Backbone.Model.extend({
  initialize: function(){
    var row = data.content[this.get('id')];
    this.set('contentCollection', new ContentCollection(row) );
  }
});
