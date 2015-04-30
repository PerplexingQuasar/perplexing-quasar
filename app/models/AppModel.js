var AppModel = Backbone.Model.extend({
  initialize: function(){
    this.set('rowCollection', new RowCollection(rowData) );
    console.dir(this.get('rowCollection'));
  }
});
