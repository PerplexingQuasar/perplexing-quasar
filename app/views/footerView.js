
var FooterView = Backbone.View.extend({

  className: 'footer',

  template: _.template(
      '<hr>' +
      '<span class="copyright">Copyright Perplexing-Quasar 2015</span>'
    ),

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html( this.template({}) );

    return this.$el;
  }
});