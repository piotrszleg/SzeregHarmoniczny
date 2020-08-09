var Ruler = Class.create({
//initialize: function(graphWidth, xOffset, graphHeight, yOffset, columns, func, style) {
  initialize: function(x, y, left, right, fractsDistance, style, game) {
    for(var i =0; i<=left+right; i++){
      var t = new Text( x+(i-left)*fractsDistance, y, (i-left).toString(), {} );
      t.scale=1.7;
      game.add(t);
    }
  }
});