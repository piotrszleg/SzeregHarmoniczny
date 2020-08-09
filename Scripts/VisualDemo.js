var VisualDemo= (function() { 
	var shown=false;
	var game = new Game("Samochod", start, update, visible);
	var car;

	function start(){
		game.add(new Grid(1-1000,1, 450+2000, 300, {strokeStyle:"#c7c7d7"}));
		game.add(new Text(225,30,"Szybkość z jaką Rozbiega się Ciąg Harmoniczny", {})).scale=1.8;
		game.add(new Text(225,48,"Samochód porusza się o kolejne liczby harmoniczne", {fillStyle:"#888"})).scale=1.5;

		game.camera=game.add(new Actor(game.width/2, game.height/2));

		points=[];
	    points.push(new Actor(1-1000, 235));
	    points.push(new Actor(450+2000, 235));
	    var line = new Line(points, {fillStyle:"#ddd", lineWidth:2, strokeStyle:"#222"});
	    game.add(line);

		game.add(new Ruler(25, 255, 10, 10, 100, {}, game));

		car = game.add(new Sprite(0, 140, "Assets/car.png"));
		car.scale=0.3;
	}

	new ButtonProvider("VisualDemoReset", function(){
	    car.tween.stop();
	    car.x=0;
	    game.camera.x=game.width/2;
	    CarTweening(0);
	});

	var mouseDown=false;
	var mousePosition=Vector2.zero;

	game.canvas.addEventListener("mousedown", function(e) {
		mouseDown=true;
		e.preventDefault();
	}, false);
	game.canvas.addEventListener("mouseup", function(e) {
		mouseDown=false;
		e.preventDefault();
	}, false);
	game.canvas.addEventListener("mousemove", function(e) {
		var canvasRect=game.canvas.getBoundingClientRect();
		mousePosition=new Vector2((e.clientX-canvasRect.left), (e.clientY-canvasRect.top));
	}, false);

	function Update(){
		if(mouseDown){
			if(mousePosition.x>game.width/2 && game.camera.x<1000-game.width/2){
				game.camera.x+=10;
			} 
			if(mousePosition.x<game.width/2 &&game.camera.x>-1000+game.width/2){
				game.camera.x-=10;
			} 
		} 
		requestAnimationFrame(Update);
	}
	requestAnimationFrame(Update);

	function CarTweening(evals){
		var sx=car.x;
		car.tween = new TWEEN.Tween(car)
			.to({x : sx + 1/(evals+1)*100}, 1000)
			.delay(500)
			.onStart(function() {
					//console.log(1/(evals+1));
			})
			.onComplete(function() {
					CarTweening(evals+1);
			})
			.start();
	}

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

	function visible(){
		CarTweening(0);
	}

	function update(time) {

	}
	start();
	return {
				game,
				car,
				shown,
		};  
})();