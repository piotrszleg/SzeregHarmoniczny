var Game = Class.create({
	initialize: function(canvasID, start, update, visible) {
		this.start=start;
		this.canvas = document.getElementById(canvasID);
		this.width=this.canvas.width;
		this.height=this.canvas.height;
		this.ctx = this.canvas.getContext("2d");
		this.update=update;
		this.visible=visible;
		this.shown=false;
		this.input=new Input(this.canvas);
		this.GOs=[];
		var self = this;
		requestAnimationFrame(function(time){self.frame(time)});
	},
	frame: function(time) {
		TWEEN.update(time);
		this.GOs.forEach(function (go){
		  if(go.active)go.update(time);
		});
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.save();
		if(this.camera!==undefined && this.camera!==null){
			this.ctx.translate(-this.camera.x+this.width/2, -this.camera.y+this.height/2);
		}
		this.ctx.lineCap="round";
		this.ctx.lineJoin="round";
		var i;
		for(i=0; i< this.GOs.length; i++){
			this.ctx.save();
			if(this.GOs[i].active){
				this.GOs[i].render(this.ctx);
			}
			this.ctx.restore();
		}
		if(isScrolledIntoView(this.canvas)&&!this.shown){
		    this.visible();
		    this.shown=true;
		}
		this.ctx.restore();
		var self = this;
		requestAnimationFrame(function(time){self.frame(time)});
	},
	add: function(gameObject) {
		this.GOs.push(gameObject);
		return gameObject;
	},
	remove: function(gameObject){
		this.GOs.splice(this.GOs.indexOf(gameObject), 1);
	}
});