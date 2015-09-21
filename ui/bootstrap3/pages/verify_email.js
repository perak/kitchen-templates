Template.TEMPLATE_NAME.rendered = function() {
	pageSession.set("errorMessage", "");

  var verifyEmailToken = Router.current().params.verifyEmailToken;
  if (verifyEmailToken) {
      Accounts.verifyEmail(verifyEmailToken, function (err) {
          if (err) {
            pageSession.set("errorMessage", err.message);
          }
      });
  }
  else {
    pageSession.set("errorMessage", err.message);
  }
	/*TEMPLATE_RENDERED_CODE*/
};

Template.TEMPLATE_NAME.events({
  "click .go-home": function(e, t) {
    Router.go("/");
  }
  /*EVENTS_CODE*/
});

Template.TEMPLATE_NAME.helpers({
  "errorMessage": function() {
    return pageSession.get("errorMessage");
  }
  /*HELPERS_CODE*/
});
