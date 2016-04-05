import React from "react";
import {mount} from "react-mounter";
import {Layout} from "/client/pages/layout/layout.jsx";
import {NotFound} from "/client/pages/not_found/not_found.jsx";
/*IMPORTS*/

const freeRouteNames = [
	/*FREE_ROUTES*/
];

const freeRoutes = FlowRouter.group( { name: "free" } );

FlowRouter.notFound = {
	action () {
		mount(Layout, {
			content: (<NotFound />)
		});
	}
};
