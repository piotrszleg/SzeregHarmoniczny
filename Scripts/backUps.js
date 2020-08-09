var pointStyle={fillStyle : "white", lineWidth:5, strokeStyle:"#222"};
points=[];
var bottomBorder=250;
var height=180;
points.push(new Point(20, bottomBorder, 0))
for(var i =0; i<11; i++){
  var point = new Point(20+i*40, bottomBorder, 1, pointStyle);
  fract = new Fraction(-4, -30, 1, 2)
  fract.lScale=0.3;
  fract.parent=point;
  points.push(point);
  var tween = new TWEEN.Tween(point)
      .to({ ly: bottomBorder-(1/(i+1))*height , lScale : 5}, 1000)
      .delay(i*100)
      .easing(TWEEN.Easing.Quintic.InOut)
      .onUpdate(function() {
          //console.log(this.x, this.y);
      })
      .start();
}
points.push(new Point(420, bottomBorder, 0))
var line = new Line(points, {fillStyle:"#ddd", lineWidth:5, strokeStyle:"#222"});
GameObject.SetIndex(line, 0);


/*
points=[];
var bottomBorder=250;
var height=180;
points.push(new Point(20, bottomBorder, 0))
for(var i =0; i<11; i++){
  var point = new Point(20+i*40, bottomBorder, 1, pointStyle);
  fract = new Fraction(-4, -30, 1, 2)
  fract.lScale=0.3;
  fract.parent=point;
  points.push(point);
  var tween = new TWEEN.Tween(point)
      .to({ ly: bottomBorder-(1/(i+1))*height , lScale : 5}, 1000)
      .delay(i*100)
      .easing(TWEEN.Easing.Quintic.InOut)
      .onUpdate(function() {
          //console.log(this.x, this.y);
      })
      .start();
}*/