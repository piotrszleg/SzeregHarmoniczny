/*
var Axis= function(positive, negative){
	this.positive=positive;
	this.negative=negative;
}
*/
var Input = function(canvas) {
	this.keys = {};
	this.keysDown = {};
	this.keysUp = {};
	this.mouseButtons={};
	this.axes = {};

	this.axes["Horizontal"]=[37, 39];
	this.axes["Vertical"]=[38, 40];
	this.mousePosition=new Vector2(0,0);

	this.GetButton=function(index){
		return this.keys[index];
	}
	this.GetButtonDown=function(index){
		return this.keysDown[index];
	}
	this.GetButtonUp=function(index){
		return this.keysUp[index];
	}
	this.GetAxis=function(name){
		var axis=this.axes[name];
		if(this.keys[axis[0]]){
			return -1;
		} else if(this.keys[axis[1]]){
			return 1;
		}else{
			return 0;
		}
	}

	/*canvas.addEventListener("keydown", function(e) {
	  if ( ( e.keycode || e.which ) == 32) {
	     e.preventDefault();
	  }
	  if(!this.keys[e.keyCode]){
	  	this.keysDown[e.keyCode] = true;
	  }
	  this.keys[e.keyCode] = true;
	}, false);

	canvas.addEventListener("keyup", function(e) {
	  delete this.keys[e.keyCode];
	  this.keysUp[e.keyCode] = true;
	}, false);*/

	var self = this;
	/*
	function mousemove(e){
		var canvasRect=canvas.getBoundingClientRect();
		this.mousePosition=new Vector2((e.clientX-canvasRect.left), (e.clientY-canvasRect.top));
		console.log(0);
	}
	canvas.addEventListener("mousemove", function(e){self.mousemove(e)}, false);

	function mousedown(e){
		this.mouseButtons[e.button]=true;
	}
	canvas.addEventListener("mousedown", self.mousedown, false);

	function mouseup(e){
		delete this.mouseButtons[e.button];
	}
	canvas.addEventListener("mouseup", self.mouseup, false);*/
}