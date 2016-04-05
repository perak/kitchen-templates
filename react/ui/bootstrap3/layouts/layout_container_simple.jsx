import React from "react";
import {pathFor, menuItemClass} from "/client/lib/router_utils.js";

export const Layout = React.createClass({

	render() {
		return (
			<FreeLayout content={this.props.content} />
		);
	}
});
