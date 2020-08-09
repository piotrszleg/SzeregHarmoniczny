var lastPage;
function ShowPage(page){
	( function($) {
	  $(page).css("display", "initial");
		if(lastPage!=null && page!=lastPage)$(lastPage).css("display", "none");
		lastPage=page;
	} ) ( jQuery );
}
window.addEventListener("load", function(){ ShowPage("#Main");}, false);
//CHANGE TO #About !