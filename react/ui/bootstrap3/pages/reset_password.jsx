import React from "react";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";
/*IMPORTS*/

export const TEMPLATE_NAME = React.createClass({
	/*SUBSCRIPTIONS*/

	render() {
		if(this.data.dataLoading) {
			return (<Loading />);
		} else {
			return (
				<div className="page-container" id="content">

				</div>
			);
		}
	}
});
