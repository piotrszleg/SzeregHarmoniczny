var Graph = Class.create({
//initialize: function(graphWidth, xOffset, graphHeight, yOffset, columns, func, style) {
  initialize: function(graphWidth, xOffset, graphHeight, yOffset, columns, func, fractFunc, gradientBorders, style, game) {
    this.rects=[];
    this.fracts=[];
    this.style=style;
    //this.columns=columns;//Columns are used only for rects creating
    this.graphHeight=graphHeight;
    this.graphWidth=graphWidth;
    this.xOffset=xOffset;
    this.yOffset=yOffset;
    var columnWidth=(graphWidth-xOffset*2)/columns;
    this.columns=columns;//READ ONLY
    this.maxColumns=columns;
    this.fractFunc=fractFunc;
    this.func=func;
    this.graphHeight=graphHeight;
    //grd=game.ctx.createLinearGradient(0,55,0,70);
    grd=game.ctx.createLinearGradient(0,50,0,300-20);
    if(gradientBorders[0]){
      grd.addColorStop(0,"black");
      grd.addColorStop(0.2,"rgba(255,255,255,0)");
    }
    if(gradientBorders[1]){
      grd.addColorStop(0.8,"rgba(255,255,255,0)");
      grd.addColorStop(1,"black");
    }
    for(var i =0; i<columns; i++){
      var rect = new GradientRectangle(xOffset+i*columnWidth, yOffset, 10, 10, style, grd);
      rect.height=0;
      this.rects.push(rect);
      if(fractFunc!=null){
        fract = new Fraction(xOffset+i*columnWidth, yOffset+15, fractFunc(i)[0], fractFunc(i)[1]);
        fract.scale=1.25;
        game.add(fract);
        this.fracts.push(fract);
      }
      game.add(rect);
      var tween = new TWEEN.Tween(rect)
          .to({ height: func(i)*graphHeight}, 1000)
          .delay(i*100)
          .easing(TWEEN.Easing.Quintic.InOut)
          .onUpdate(function() {
          
          })
       rect.tween=tween;
    }
  },
  update(){
    var columnWidth=(this.graphWidth-this.xOffset*2)/this.columns;
    for(var i =0; i<this.columns; i++){
      if(this.fracts[i]!==undefined)this.fracts[i].x=this.xOffset+i*columnWidth;
      this.rects[i].x=this.xOffset+i*columnWidth;
    }
  },
  setColumns: function(columns){
    if(columns<=this.maxColumns){
      this.columns=columns;
      for(var i =0; i<this.rects.length; i++){
        if(i<columns){
          if(this.fracts[i]!==undefined)this.fracts[i].active=true;
          this.rects[i].active=true;
        } else{
          if(this.fracts[i]!==undefined)this.fracts[i].active=false;
          this.rects[i].active=false;   
        }
      }
    }
  },
  setStartingIndex: function(index){
    if(index>=0){
      for(var i =0; i<this.rects.length; i++){
        if(this.fracts[i]!==undefined){
          this.fracts[i].nominator=this.fractFunc(i+index)[0];
          this.fracts[i].denominator=this.fractFunc(i+index)[1];
        }
        var tween = new TWEEN.Tween(this.rects[i])
          .to({ height: this.func(i+index)*this.graphHeight}, 1000)
          .delay(i*100)
          .easing(TWEEN.Easing.Quintic.InOut)
          .onUpdate(function() {
          })
        this.rects[i].tween=tween;
      }
    }
  },
  animate: function(){
    for(var i =0; i<this.rects.length; i++){
      this.rects[i].tween.stop();
      this.rects[i].tween.pendingDelete = false;
      this.rects[i].height = 0;
      this.rects[i].tween.start();
    }
  }
});

function createGraph(graphWidth, xOffset, graphHeight, yOffset, columns, func, style){

  var columnWidth=(graphWidth-xOffset*2)/columns;

  for(var i =0; i<columns; i++){
    var rect = new Rectangle(xOffset+i*columnWidth, yOffset, 10, 10, style);
    rect.height=0;
    fract = new Fraction(xOffset+i*columnWidth, yOffset+20, 1, i+1);
    fract.scale=1.5;
    var tween = new TWEEN.Tween(rect)
        .to({ height: func(i)*graphHeight}, 1000)
        .delay(i*100)
        .easing(TWEEN.Easing.Quintic.InOut)
        .onUpdate(function() {
        
        })
        .start();
  }
}