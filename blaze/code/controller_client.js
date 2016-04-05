this.CONTROLLER_NAME = RouteController.extend({
	template: "TEMPLATE_NAME",
	/*LAYOUT_TEMPLATE*/

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		/*BEFORE_FUNCTION*/
	},

	action: function() {
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		/*SUBSCRIPTION_PARAMS*/

		var subs = [/*SUBSCRIPTIONS*/];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		/*DATA_PARAMS*/

		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
		/*AFTER_FUNCTION*/
	}
});