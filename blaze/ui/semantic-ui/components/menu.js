Template.TEMPLATE_NAME.rendered = function() {
	/*TEMPLATE_RENDERED_CODE*/
	this.$('.ui.dropdown').dropdown();
};

Template.TEMPLATE_NAME.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	/*EVENTS_CODE*/
});

Template.TEMPLATE_NAME.helpers({
	/*HELPERS_CODE*/
});
