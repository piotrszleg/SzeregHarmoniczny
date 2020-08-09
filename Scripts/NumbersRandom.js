var NumbersRandom= (function() { 
  var text;
  var shown=false;
  var g1, g2;

  var game = new Game("LosowySzereg", start, game, visible);

  var globalSeed=parseInt(Math.random()*1024);
  new ButtonProvider("LosowySzeregReset", function(){
      globalSeed=parseInt(Math.random()*1024);
      g1.setStartingIndex(parseInt(0));
      g1.update();
      g1.animate();
      g2.setStartingIndex(parseInt(0));
      g2.update();
      g2.animate();
  });

  function start(){

    game.add(new Grid(1,1, 450, 300, {strokeStyle:"#c7c7d7"}));
    game.add(new Text(225,30,"Losowe Liczby Harmoniczne", {})).scale=2;
    game.add(new Text(225,48,"Losowe Sumy Harmoniczne", {fillStyle:"#888"})).scale=1.7;

    points=[];
    var ypos=170;
    points.push(new Actor(0, ypos, 0));
    points.push(new Actor(10000, ypos, 0));
    g1 = new Graph(450, 20, 70, ypos, 20, harmonicSum, null, [true, true], {fillStyle : "white", lineWidth:2, strokeStyle:"#888"}, game);
    g1.update();
    g2 = new Graph(450, 20, 70, ypos, 20, harmonicNumbers, null,[true, true],{fillStyle : "gray", lineWidth:2, strokeStyle:"#222"}, game);
    g2.update();

    var line = new Line(points, {fillStyle:"#ddd", lineWidth:2, strokeStyle:"#222"});
    game.add(line);

  }

  function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  function harmonicNumbers(x){
    return (random(x+globalSeed)>0.5 ? -1 : 1) /(x+1);
  }

  function harmonicSum(x){
    if(x>0){
      return (random(x+globalSeed)>0.5 ? -1 : 1)/(x+1)+harmonicSum(x-1);
    } else{
       return (random(x+globalSeed)>0.5 ? -1 : 1);
    }
  }

  function harmonicFract(x){
    return [(random(x)>0.5 ? -1 : 1),x+1];
  }

  function visible(){
    //createGraph(450, 20, 180, 250, 11, testNumbers, {fillStyle : "white", lineWidth:2, strokeStyle:"#222"});
    g1.animate();
    g2.animate();
  }

  function update(time) {
    console.log(Input.mousePosition);
  }
  start();
  return {
        game,
        g1,
        g2,
        shown
    };  
})();