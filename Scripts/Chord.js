var Chord = Class.create({
	initialize: function(maxSegments, width, height, game) {
		this.maxSegments=this.count=maxSegments;
		this.segments=[];
		this.width=width;
		this.height=height;
		this.ypos=170;
		var chordWidth=width/maxSegments;
		for(var i =0; i<maxSegments; i++){
			var sign=i%2==0 ? -1 : 1;
			points=[];
			var ypos=this.ypos;
			points.push(new Actor(chordWidth*(i), ypos, 0));
			points.push(new Actor(chordWidth*(i+0.25), ypos+height*sign, 0));
			points.push(new Actor(chordWidth*(i+0.75), ypos+height*sign, 0));
			points.push(new Actor(chordWidth*(i+1), ypos, 0));
			/*var tween = new TWEEN.Tween(points[1])
				.to({ y:ypos-height*sign}, 1000)
				.easing(TWEEN.Easing.Sinusoidal.InOut)
				.repeat( Infinity )
				.yoyo( true )
				.start()*/
			this.animatePoint(points[1], sign)
			this.animatePoint(points[2], sign)
			var segment=new BrezierCurve(points, {lineWidth:2, strokeStyle:"#222"});
			segment.sign=sign;
			this.segments.push(segment);
			game.add(segment);
		}
	},
	setSegments: function(count){
		var chordWidth=this.width/count;
		this.count=count;
		if(count<=this.maxSegments){
		for(var i =0; i<this.segments.length; i++){
			if(i<count){
			  if(this.segments[i]!==undefined)
				this.segments[i].active=true;
				this.segments[i].points[0].x=chordWidth*(i);
				this.segments[i].points[1].x=chordWidth*(i+0.25);
				this.animatePoint(this.segments[i].points[1], this.segments[i].sign);

				this.segments[i].points[2].x=chordWidth*(i+0.75);
				this.segments[i].points[3].x=chordWidth*(i+1);

				this.animatePoint(this.segments[i].points[2], this.segments[i].sign);

			} else{
			  if(this.segments[i]!==undefined)
				this.segments[i].active=false;  
			}
		}
	 }
  },
  animatePoint(point, sign){
  		point.y=this.ypos+(this.height/this.count*3)*sign;
  		if(point.tween!=undefined)
  			point.tween.stop();
  		var tween = new TWEEN.Tween(point)
				.to({ y:this.ypos+(this.height/this.count*3)*-sign}, 500)
				.easing(TWEEN.Easing.Sinusoidal.InOut)
				.repeat( Infinity )
				.yoyo( true )
				.start();
		point.tween=tween;
  }
});