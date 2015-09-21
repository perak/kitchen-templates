Template.TEMPLATE_NAME.rendered = function() {
  $(document.body).prepend($('.sidebar').detach());

  $('.right_menu').click(function(){
    $('.right.sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
  });

  $('.left_menu').click(function(){
    $('.left.sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
  });
  
};

Template.TEMPLATE_NAME.events({
	"click #l_menu_btn": function(e, t) {
		e.preventDefault();
		$('.left.sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
	},
	"click #r_menu_btn": function(e, t) {
		e.preventDefault();
		$('.right.sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
	},

	/*EVENTS_CODE*/
});
