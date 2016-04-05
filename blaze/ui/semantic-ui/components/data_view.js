var ITEMS_FUNCTION = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("SEARCH_STRING_SESSION_VAR");
	var sortBy = pageSession.get("SORT_BY_SESSION_VAR");
	var sortAscending = pageSession.get("SORT_ASCENDING_SESSION_VAR");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = [/*SEARCH_FIELDS*/];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var EXPORT_FUNCTION = function(cursor, fileType) {
	var data = ITEMS_FUNCTION(cursor);
	var exportFields = [/*EXPORT_FIELDS*/];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.TEMPLATE_NAME.rendered = function() {
	$('.ui.dropdown').dropdown();
	pageSession.set("VIEW_STYLE_SESSION_VAR", "INITIAL_VIEW_STYLE");
	/*TEMPLATE_RENDERED_CODE*/
};

Template.TEMPLATE_NAME.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("SEARCH_STRING_SESSION_VAR", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("SEARCH_STRING_SESSION_VAR", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("SEARCH_STRING_SESSION_VAR", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/*INSERT_ROUTE*/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		EXPORT_FUNCTION(this.QUERY_VAR, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		EXPORT_FUNCTION(this.QUERY_VAR, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		EXPORT_FUNCTION(this.QUERY_VAR, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		EXPORT_FUNCTION(this.QUERY_VAR, "json");
	}

	/*EVENTS_CODE*/
});

Template.TEMPLATE_NAME.helpers({

	/*INSERT_BUTTON_CLASS_HELPER*/

	"isEmpty": function() {
		return !this.QUERY_VAR || this.QUERY_VAR.count() == 0;
	},
	"isNotEmpty": function() {
		return this.QUERY_VAR && this.QUERY_VAR.count() > 0;
	},
	"isNotFound": function() {
		return this.QUERY_VAR && pageSession.get("SEARCH_STRING_SESSION_VAR") && ITEMS_FUNCTION(this.QUERY_VAR).length == 0;
	},
	"searchString": function() {
		return pageSession.get("SEARCH_STRING_SESSION_VAR");
	},
	"viewAsTable": function() {
		return pageSession.get("VIEW_STYLE_SESSION_VAR") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("VIEW_STYLE_SESSION_VAR") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("VIEW_STYLE_SESSION_VAR") == "gallery";
	}

	/*HELPERS_CODE*/
});
