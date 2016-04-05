Template.TEMPLATE_NAME.rendered = function() {
	pageSession.set("errorMessage", "");
	pageSession.set("verificationEmailSent", false);

	/*TEMPLATE_RENDERED_CODE*/
	Meteor.defer(function() {
		$("input[autofocus]").focus();
	});

};

Template.TEMPLATE_NAME.created = function() {
	pageSession.set("errorMessage", "");
};

Template.TEMPLATE_NAME.events({
	'submit #register_form' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));

		var register_name = t.find('#register_name').value.trim();
		var register_email = t.find('#register_email').value.trim();
		var register_password = t.find('#register_password').value;

		// check name
		if(register_name == "")
		{
			pageSession.set("errorMessage", "Please enter your name.");
			t.find('#register_name').focus();
			return false;
		}

		// check email
		if(!isValidEmail(register_email))
		{
			pageSession.set("errorMessage", "Please enter valid e-mail address.");
			t.find('#register_email').focus();
			return false;
		}

		// check password
		var min_password_len = 6;
		if(!isValidPassword(register_password, min_password_len))
		{
			pageSession.set("errorMessage", "Your password must be at least " + min_password_len + " characters long.");
			t.find('#register_password').focus();
			return false;
		}

		submit_button.button("loading");
		Accounts.createUser({email: register_email, password : register_password, profile: { name: register_name }}, function(err) {
			submit_button.button("reset");
			if(err) {
				if(err.error === 499) {
					pageSession.set("verificationEmailSent", true);
				} else {
					pageSession.set("errorMessage", err.message);
				}
			}
			else
			{
				pageSession.set("errorMessage", "");
				pageSession.set("verificationEmailSent", true);
			}
		});
		return false;
	},

	"click .go-home": function(e, t) {
		Router.go("/");
	}
	/*EVENTS_CODE*/
});

Template.TEMPLATE_NAME.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	verificationEmailSent: function() {
		return pageSession.get("verificationEmailSent");
	}
	/*HELPERS_CODE*/
});
