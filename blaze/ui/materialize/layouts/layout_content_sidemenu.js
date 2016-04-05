Template.TEMPLATE_NAME.rendered = function() {
  $('.button-collapse').sideNav({
      menuWidth: 200, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
};

Template.TEMPLATE_NAME.events({
	/*EVENTS_CODE*/
});
