var StringsExample= (function() { 
  var text;
  var shown=false;
  var g1, g2;
  var chord;
  var fract;

  var game = new Game("Struny", start, game, visible);

  var slider=new SliderProvider("StringsInput", function(){
    chord.setSegments(slider.value);
    fract.denominator=slider.value;
  });

  function start(){

    game.add(new Grid(1,1, 450, 300, {strokeStyle:"#c7c7d7"}));
    game.add(new Text(225,30,"Liczby Harmoniczne", {})).scale=2;
    game.add(new Text(225,48,"Sumy Harmoniczne", {fillStyle:"#888"})).scale=1.7;
    chord=new Chord(7, game.width, 50, game);
    chord.setSegments(slider.value);
    game.add(new Text(42,270,"Alikwot:", {})).scale=1.7;
    fract = new Fraction(82, 262, 1, 5);
    game.add(fract);
    fract.scale=2;
  }

  addEventListener("keyup", function(e) {

  }, false);

  function visible(){

  }

  function update(time) {
    console.log(Input.mousePosition);
  }
  start();
  return {
        game,
        shown,
        chord
    };  
})();