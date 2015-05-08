var AppModel = Backbone.Model.extend({
  initialize: function(){
    console.log(window.data);
    this.set('rowCollection', new RowCollection(data.header) );
    // console.dir(this.get('rowCollection'));
  }
});
