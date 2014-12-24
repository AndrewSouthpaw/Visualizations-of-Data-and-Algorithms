

var andThen = {
  delay: 0,
  doThis: function(cb, delay){
    andThen.delay += delay;
    setTimeout(function() {
      cb();
    }, andThen.delay);
  },
  reset: function(){
    this.delay = 0;
  },
}