Template.TEMPLATE_NAME.rendered = function() {
	/*TEMPLATE_RENDERED_CODE*/
};

Template.TEMPLATE_NAME.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("SORT_BY_SESSION_VAR");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("SORT_BY_SESSION_VAR", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("SORT_ASCENDING_SESSION_VAR") || false;
			pageSession.set("SORT_ASCENDING_SESSION_VAR", !sortAscending);
		} else {
			pageSession.set("SORT_ASCENDING_SESSION_VAR", true);
		}
	}
});

Template.TEMPLATE_NAME.helpers({
	"tableItems": function() {
		return ITEMS_FUNCTION(this.QUERY_VAR);
	}
});
