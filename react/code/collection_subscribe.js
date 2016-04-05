	mixins: [
		ReactMeteorData
	],

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

	getMeteorData: function() {
		var data = { dataLoading: true };

		if(this.isReady()) {
			/*DATA_PARAMS*/

			/*DATA_OBJECT_SET*/

			/*CUSTOM_DATA_CODE*/
		}
		return data;
	},
