var GameObject = Class.create({

  initialize: function() {
    this.active=true;
    //GameObject.array.push(this);
  },
  render:function(ctx) {

  },
  update:function(modifier) {

  },
});/*
GameObject.array=[];
GameObject.Destroy = function(gameObject){
  GameObject.array.splice(GameObject.array.indexOf(gameObject),1);
}
GameObject.SetIndex = function(gameObject, index){
  GameObject.array[GameObject.array.indexOf(gameObject)]=GameObject.array[index];
  GameObject.array[index]=gameObject;
}*/

var Actor = Class.create(GameObject, {
  initialize: function($super, x, y, parent=null) {
    this.scale=1;
    this.lScale=this.scale;
    this.x=x;
    this.y=y;
    this.lx=this.ly=0;
    this.rotation=0;
    this.lRotation=this.rotation;
    $super();
  },
  update:function(modifier) {
    if(this.parent!=null){
      this.scale=this.lScale*this.parent.scale;
      this.rotation=this.lRotation*this.parent.rotation;
      this.x=this.lx+this.parent.x;
      this.y=this.ly+this.parent.y;
    } else{
      this.lScale=this.scale;
      this.lRotation=this.rotation;
      this.lx=this.x;
      this.ly=this.y;
    }
  },
  render: function(ctx) {
    ctx.translate(this.x, this.y); 
    ctx.rotate(this.rotation);//*Math.PI/180
  }
});

function setStyle(ctx, style){
  if(style!=null){
      if(style.lineWidth!=null)
        ctx.lineWidth=style.lineWidth;
      if(style.strokeStyle!=null)
        ctx.strokeStyle = style.strokeStyle;
      if(style.fillStyle!=null){
        ctx.fillStyle = style.fillStyle;
      }
    }
}

var Point = Class.create(Actor, {
  initialize: function($super, x, y, radius, style) {
    this.style=style;
    $super(x, y);
    this.scale=radius;
  },
  render: function($super, ctx) {
    $super(ctx);
    ctx.beginPath();
    setStyle(ctx, this.style);
    ctx.arc(0, 0, this.scale, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
  }
});

var Sprite = Class.create(Actor, {
  initialize: function($super, x, y, imageFile) {
    this.image=new Image();
    this.image.src=imageFile;
    $super(x, y);
  },
  render: function($super, ctx) {
    $super(ctx);
    ctx.scale(this.scale,this.scale);
    ctx.drawImage(this.image,10,10);
  }
});

var Rectangle = Class.create(Actor, {
  initialize: function($super, x, y, width, height, style={}) {
    this.style=style;
    this.width=width;
    this.height=height;
    $super(x, y);
  },
  render: function($super, ctx) {
    $super(ctx);
    setStyle(ctx, this.style);
    ctx.fillRect(0,0,this.width*this.scale, -this.height*this.scale);
    ctx.strokeRect(0,0,this.width*this.scale, -this.height*this.scale);
  }
});

var GradientRectangle = Class.create(Actor, {
  initialize: function($super, x, y, width, height, style={}, gradient="rgba(255,255,255,0)") {
    this.style=style;
    this.width=width;
    this.height=height;
    this.gradient=gradient;
    $super(x, y);
  },
  render: function($super, ctx) {
    layerContext=GradientRectangle.layerContext;
    layerContext.save();
    layerContext.clearRect(0, 0, GradientRectangle.layerCanvas.width, GradientRectangle.layerCanvas.height);
    $super(layerContext);
    setStyle(layerContext, this.style);
    layerContext.fillRect(0,0,this.width*this.scale, -this.height*this.scale);
    layerContext.strokeRect(0,0,this.width*this.scale, -this.height*this.scale);
    layerContext.globalCompositeOperation="destination-out";
    layerContext.translate(-this.x, -this.y);
    layerContext.fillStyle=this.gradient;
    layerContext.fillRect(0,0,450,300);
    layerContext.restore();
    ctx.drawImage(GradientRectangle.layerCanvas, 0, 0);
  }
});

GradientRectangle.layerCanvas = document.createElement("canvas");
GradientRectangle.layerContext = GradientRectangle.layerCanvas.getContext("2d");
GradientRectangle.layerCanvas.width=450;
GradientRectangle.layerCanvas.height=300;

var Grid = Class.create(Actor, {
  initialize: function($super, x, y, width, height, style={}) {
    this.style=style;
    this.width=width;
    this.height=height;
    this.cellSize=10;
    $super(x, y);
  },
  render: function($super, ctx) {
    $super(ctx);
    ctx.beginPath();
    setStyle(ctx, this.style);
    for(var y =0; y<=this.height/this.cellSize; y++){
      ctx.moveTo(0,y*this.cellSize);
      ctx.lineTo(this.width,y*this.cellSize);
    }
    ctx.moveTo(0,0);
    for(var x =0; x<=this.width/this.cellSize; x++){
      ctx.moveTo(x*this.cellSize,0);
      ctx.lineTo(x*this.cellSize,this.height);
    }
    ctx.stroke();
  }
});

var Text = Class.create(Actor, {
  initialize: function($super, x, y, text, style) {
    this.text=text;
    this.style=style;
    $super(x, y);
  },
  render: function($super, ctx) {
    $super(ctx);
    ctx.beginPath();
    setStyle(ctx, this.style);
    ctx.scale(this.scale,this.scale);
    ctx.translate(-(ctx.measureText(this.text).width)/2, 0);
    ctx.fillText(this.text, 0, 0);
    ctx.stroke();
    ctx.fill();
  }
});

var Fraction = Class.create(Actor, {
  initialize: function($super, x, y, numerator, denominator, style) {
    this.numerator=numerator;
    this.denominator=denominator;
    this.style=style;
    $super(x, y);
  },
  render: function($super, ctx) {
    $super(ctx);
    ctx.beginPath();
    setStyle(ctx, this.style);
    ctx.scale(this.scale,this.scale);
    ctx.fillText(this.numerator, 0, 0);
    ctx.moveTo(-3, 1.5);
    ctx.lineTo(9,1.5);
    ctx.translate(3-(ctx.measureText(this.denominator).width)/2, 10);
    ctx.fillText(this.denominator, 0, 0);
    ctx.stroke();
    ctx.fill();
  }
});

var Line = Class.create(GameObject, {
  initialize: function($super, points, style) {
    this.points=points;
    this.style=style;
    $super();
  },
  render: function(ctx) {
    ctx.save();
    ctx.beginPath();
    setStyle(ctx, this.style);
    ctx.moveTo(this.points[0].x,this.points[0].y);
    for (i = 1; i < this.points.length; i++) { 
      ctx.lineTo(this.points[i].x,this.points[i].y);
    }
    ctx.lineTo(this.points[0].x,this.points[0].y);
    //console.log(this.points[0].);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
});

var BrezierCurve = Class.create(GameObject, {
  initialize: function($super, points, style) {
    this.points=points;
    this.style=style;
    $super();
  },
  render: function(ctx) {
    ctx.save();
    ctx.beginPath();
    setStyle(ctx, this.style);
    ctx.moveTo(this.points[0].x,this.points[0].y);
    ctx.bezierCurveTo(this.points[1].x,this.points[1].y,this.points[2].x,this.points[2].y,this.points[3].x,this.points[3].y);
    ctx.stroke();
    if(this.style.fillStyle!=null){
      ctx.fill();
    }
    ctx.restore();
  }
});