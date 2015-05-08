
var RowModel = Backbone.Model.extend({
  initialize: function(){
    var row = data.content[this.get('name')];
    this.set('contentCollection', new ContentCollection(row) );
  }
});
