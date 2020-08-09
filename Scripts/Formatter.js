var Formatter= (function() { 
  var KeyWords = {
      "_": "b",
      "!": "h2",
      "`": "h3",
      "^": "sup"
  }
  var Sources = {
  		"|": "img"
  }

  var escape="€";
  
  var generatePars = function(div){
    var raw = div.innerHTML;
    var buf="<p>";
    var oppenedTags=[];
    for (var l = 0; l < raw.length; l++) {
      if(oppenedTags.indexOf(escape)>0){
        if((raw[l]==escape)){
          delete oppenedTags[oppenedTags.indexOf(escape)];
          buf+="<p>"
        }else{
          buf+=raw[l];
        }
      }
      else if(raw[l]==escape){
        oppenedTags.push(escape);
        buf+="</p>"
      }
      else if(raw[l]=="\n") {//New line
      		if(l<raw.length-1)buf+="</p>\n<p>"//<br>
          if(l==raw.length-1)buf+="</p>"
      }
      else if(KeyWords.hasOwnProperty(raw[l])&&oppenedTags.indexOf("img")<0) {
      	var tag=KeyWords[raw[l]];
      	if(oppenedTags.indexOf(tag)<0){
        	buf+="<"+tag+">";
          oppenedTags.push(tag);
        }
      	else{
          buf+="</"+tag+">";
          delete oppenedTags[oppenedTags.indexOf(tag)];
        }
      }
      else if(Sources.hasOwnProperty(raw[l])) {
      	var tag=Sources[raw[l]];
      	if(oppenedTags.indexOf(tag)<0){
        	buf+="<"+tag+" src='"
          oppenedTags.push(tag);
        }
      	else{
          buf+="'>";
          delete oppenedTags[oppenedTags.indexOf(tag)];
       }
      }
      /*else if(raw[l]=="_") {//Bold letters
      	if(oppenedTags.indexOf("_")<0){
        	buf+="<b>";
          oppenedTags.push("_");
        }
      	else{
          buf+="</b>";
          delete oppenedTags[oppenedTags.indexOf("_")];
        }
      }
      else if(raw[l]=="!") {//Headers
      	if(oppenedTags.indexOf("!")<0){
        	buf+="<h1>";
          oppenedTags.push("!");
        }
      	else{
          buf+="</h1>";
          delete oppenedTags[oppenedTags.indexOf("!")];
        }
      }*/
      else{
        buf+=raw[l];
  		}
    }
      div.innerHTML=buf;
      //console.log(buf);
  }
  var init=function(e){
    var div = document.getElementsByClassName("format");
    var i;
    for(i=0;i<div.length; i++)
      generatePars(div[i]);
  }
  init();
  return {
        generatePars,
        KeyWords,
        Sources
    };  
})();