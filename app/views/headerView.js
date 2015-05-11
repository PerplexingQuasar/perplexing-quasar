var HeaderView = Backbone.View.extend({

  template: _.template(
    '<a href=<%- url %> ><h4 id="display-title"><span id="displaybase">DisplayBase</span>' +
    '<span id="js">.js</span></h4></a>' +
    '<a href="https://github.com/PerplexingQuasar/perplexing-quasar">' +
      '<img class="git-icon" src="assets/images/gitIcon.png">' +
    '</a>'
    ),
  className: 'headroom',
  id:'headroom',
  intialize: function(){
    this.render();
  },
  render: function(){

    //Change the object value to whatever we want the link to be.
    this.$el.html(this.template({url: ''}));


    return this.$el;
  }
});
