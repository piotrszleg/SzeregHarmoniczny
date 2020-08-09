var SliderProvider = Class.create({
  initialize: function(elementID, invokeOnChange) {
    this.element = document.getElementById(elementID);
    this.value=this.element.value;

    var self=this;

    this.element.addEventListener("input", function(){
      self.value=self.element.value;
    }, false);
    this.element.addEventListener("input", invokeOnChange, false);
  }
});
var ButtonProvider = Class.create({
  initialize: function(elementID, invokeOnClick) {
    this.element = document.getElementById(elementID);
    this.element.addEventListener("click", invokeOnClick, false);
  }
});