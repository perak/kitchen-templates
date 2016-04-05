Template.TEMPLATE_NAME.rendered = function() {
	/*TEMPLATE_RENDERED_CODE*/

	$('select').material_select();
	Materialize.updateTextFields();

	pageSession.set("INFO_MESSAGE_VAR", "");
	pageSession.set("ERROR_MESSAGE_VAR", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

//	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.TEMPLATE_NAME.events({
	"click #form-submit-button": function(e, t) {
		e.preventDefault();
		$(".form_TEMPLATE_NAME").submit();
	},
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("INFO_MESSAGE_VAR", "");
		pageSession.set("ERROR_MESSAGE_VAR", "");

		var self = this;

		function submitAction(msg) {
			var FORM_MODE_VAR = "FORM_MODE";
			if(!t.find("#form-cancel-button")) {
				switch(FORM_MODE_VAR) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("INFO_MESSAGE_VAR", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("ERROR_MESSAGE_VAR", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				/*HIDDEN_FIELDS*/

				/*SUBMIT_CODE*/
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		/*CANCEL_CODE*/

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	/*EVENTS_CODE*/
});

Template.TEMPLATE_NAME.helpers({
	"infoMessage": function() {
		return pageSession.get("INFO_MESSAGE_VAR");
	},
	"errorMessage": function() {
		return pageSession.get("ERROR_MESSAGE_VAR");
	}
	/*HELPERS_CODE*/
});
