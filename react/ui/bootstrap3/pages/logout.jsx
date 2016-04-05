import React from "react";
import {Meteor} from "meteor/meteor";
import {Loading} from "/client/pages/loading/loading.jsx";


export const Logout = React.createClass({
	render() {
		Meteor.logout(() => {});

		return (
			<div className="loading">
				<i className="fa fa-circle-o-notch fa-4x fa-spin"></i>
			</div>
		);
	}
});
