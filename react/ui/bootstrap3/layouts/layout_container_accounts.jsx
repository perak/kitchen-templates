import React from "react";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";
/*IMPORTS*/

export const Layout = React.createClass({
	mixins: [
		ReactMeteorData
	],

	getMeteorData() {
		var data = {};

		data.currentUser = Meteor.user();

		return data;
	},

	render() {
		return this.data.currentUser ? <PrivateLayout content={this.props.content} /> : <PublicLayout content={this.props.content} />
	}
});
