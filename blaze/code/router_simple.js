Router.configure(/*ROUTER_CONFIG*/);

var freeRoutes = [
	/*FREE_ROUTES*/
];

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		$("body").addClass("wait");
		this.render("loading");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.map(function () {
/*ROUTER_MAP*/
});
