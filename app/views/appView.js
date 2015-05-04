var AppView = Backbone.View.extend({


  className: 'container-fluid',

  initialize: function(){
    this.render();
  } ,

  render: function() {
    var that = this;
    this.model.get('rowCollection').each(function(row){
      var newRowView = new RowView({model: row})
      that.$el.append(newRowView.render());
    });

    // Append into the DOM
    $('body').empty().append( this.$el );

  }
});

