var AppModel = Backbone.Model.extend({
  initialize: function(){
    this.set('rowCollection', new RowCollection(data.header) );
    console.dir(this.get('rowCollection'));
  }
});
