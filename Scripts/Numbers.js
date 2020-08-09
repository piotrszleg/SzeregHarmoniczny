var Numbers= (function() { 
  var text;
  var shown=false;
  var g1, g2;

  var game = new Game("KolejneLiczby", start, game, visible);

  var slider=new SliderProvider("HarmonicColumnsInput", function(){
    g1.setColumns(slider.value);
    g1.update();
    g1.animate();
    g2.setColumns(slider.value);
    g2.update();
    g2.animate();
  });
  var slider2=new SliderProvider("HarmonicStartIndex", function(){
    g1.setStartingIndex(parseInt(slider2.value-1));
    g1.update();
    g1.animate();
    g2.setStartingIndex(parseInt(slider2.value-1));
    g2.update();
    g2.animate();
  });

  function start(){

    game.add(new Grid(1,1, 450, 300, {strokeStyle:"#c7c7d7"}));
    game.add(new Text(225,30,"Liczby Harmoniczne", {})).scale=2;
    game.add(new Text(225,48,"Sumy Harmoniczne", {fillStyle:"#888"})).scale=1.7;

    var gradient=game.ctx.createLinearGradient(0, 0, 0, -200);
    gradient.addColorStop(0,"white");
    gradient.addColorStop(0.5,"rgba(225,255,255,0)");
    gradient.addColorStop(1,"white");

    points=[];
    points.push(new Actor(0, 250, 0));
    points.push(new Actor(10000, 250, 0));
    g1 = new Graph(450, 20, 40, 250, 20, harmonicSum, null, [true, false], {fillStyle : "white", lineWidth:2, strokeStyle:"#888"}, game);
    g1.setColumns(slider.value);
    g1.update();
    g2 = new Graph(450, 20, 40, 250, 20, harmonicNumbers, harmonicFract, [true, false], {fillStyle : "gray", lineWidth:2, strokeStyle:"#222"}, game);
    g2.setColumns(slider.value);
    g2.update();

    var line = new Line(points, {fillStyle:"#ddd", lineWidth:2, strokeStyle:"#222"});
    game.add(line);

  }

  addEventListener("keyup", function(e) {

  }, false);

  function harmonicNumbers(x){
    return 1/(x+1);
  }

  function harmonicSum(x){
    if(x>0){
      return 1/(x+1)+harmonicSum(x-1);
    } else{
       return 1;
    }
  }

  function harmonicFract(x){
    return [1,x+1];
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