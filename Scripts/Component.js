var Component = Class.create({
  initialize: function(gameObject) {
    this.gameObject=gameObject; 
    this.active=true;
    this.start(); 
  },
  start:function(){

  },
  render:function(context) {
   
  },
  update:function(modifier) {
    
  },
  onCollision:function(collision){

  }
});

var SpriteRenderer = Class.create(Component, {
  start: function(){
    this.sprite=new Sprite("", new Rect(0,0,0,0), new Vector2(0,0));
  },
  render: function(context) {
    gameObject=this.gameObject;
    if(gameObject.rotation!=0){
      context.save();
      context.translate(gameObject.position.x, gameObject.position.y); 
      context.rotate(gameObject.rotation);
      context.drawImage(this.image, -this.image.width/2, -this.image.height/2);
      context.restore();
    } else{
      context.drawImage(this.sprite.image, gameObject.position.x-this.sprite.image.width*this.sprite.pivot.x, gameObject.position.y-this.sprite.image.height*this.sprite.pivot.y);
    }
  }
});

var Player = Class.create(Component, {
  start: function(){
    this.rigidbody=this.gameObject.getComponent(Rigidbody);
  },
  update: function(modifier) {
    var direction = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
    direction.normalize();
    this.rigidbody.velocity=direction.multiply(modifier*1000);
  }
});

var Follower = Class.create(Component, {
  start: function(){
    this.target=this.gameObject;
    this.speed=700;
    this.rigidbody=this.gameObject.getComponent(Rigidbody);
  },
  update: function(modifier) {
    var direction=Vector2.subtract(this.target.position, this.gameObject.position);
    direction.normalize();
    this.rigidbody.velocity=direction.multiply(modifier*this.speed);
  }
});

var Drift = Class.create(Component, {
  start: function(){
    this.speed=10;
  },
  update: function(modifier) {
    this.gameObject.position.x-=modifier*this.speed;
  }
});

var PointRenderer = Class.create(Component, {
  start: function(){
    this.radius=10;
  },
  render: function(context) {
    context.save();
    context.translate(this.gameObject.position.x, this.gameObject.position.y); 
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
    context.restore();
  }
});

var MousePlayer = Class.create(Component, {
  update: function(modifier) {
    gameObject=this.gameObject;
    gameObject.position.x=Input.mousePosition.x;
    gameObject.position.y=Input.mousePosition.y;
    if(Input.GetButtonDown(32)){
      //GameObject.Destroy(gameObject);
    }
  }
});
