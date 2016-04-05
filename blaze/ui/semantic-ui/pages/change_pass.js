pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

Template.TEMPLATE_NAME.rendered = function() {
	/*TEMPLATE_RENDERED_CODE*/
	$("input[autofocus]").focus();
};

Template.TEMPLATE_NAME.created = function() {
	pageSession.set("errorMessage", "");	
	pageSession.set("infoMessage", "");	
};

Template.TEMPLATE_NAME.events({
	'submit #change_pass_form' : function(e, t) {
		e.preventDefault();

		pageSession.set("errorMessage", "");
		pageSession.set("infoMessage", "");

		var submit_button = $(t.find(":submit"));

		var old_password = t.find('#old_password').value;
		var new_password = t.find('#new_password').value;
		var confirm_pass = t.find('#confirm_pass').value;

		if(old_password == "")
		{
			pageSession.set("errorMessage", "Please enter your old password.");
			t.find('#old_password').focus();
			return false;
		}
		if(new_password == "")
		{
			pageSession.set("errorMessage", "Please enter your new password.");
			t.find('#new_password').focus();
			return false;
		}
		if(confirm_pass == "")
		{
			pageSession.set("errorMessage", "Please confirm your new password.");
			t.find('#confirm_pass').focus();
			return false;
		}

		// check new password
		if(new_password != confirm_pass)
		{
			pageSession.set("errorMessage", "Your new password and confirm password doesn't match.");
			t.find('#new_password').focus();
			return false;
		}

		submit_button.addClass("loading");
		Accounts.changePassword(old_password, new_password, function(err) {
			submit_button.removeClass("loading");
			if (err) {
				pageSession.set("errorMessage", err.message);
				return false;
			} else {
				pageSession.set("errorMessage", "");
				pageSession.set("infoMessage", "Your new password is set.");
				t.find('#old_password').value = "";
				t.find('#new_password').value = "";
				t.find('#confirm_pass').value = "";
				t.find('#old_password').focus();
			}
		});
		return false; 
	}
	/*EVENTS_CODE*/
});

Template.TEMPLATE_NAME.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	infoMessage: function() {
		return pageSession.get("infoMessage");
	}
	/*HELPERS_CODE*/
});
