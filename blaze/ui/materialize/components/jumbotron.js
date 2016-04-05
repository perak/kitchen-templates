Template.TEMPLATE_NAME.rendered = function() {
	/*TEMPLATE_RENDERED_CODE*/
};

Template.TEMPLATE_NAME.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("BUTTON_ROUTE", {/*BUTTON_ROUTE_PARAMS*/});
	}
	/*EVENTS_CODE*/
});

Template.TEMPLATE_NAME.helpers({
	/*HELPERS_CODE*/
});
