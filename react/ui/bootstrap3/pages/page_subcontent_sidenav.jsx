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
				<div className="page-container">
					<div className="row">
						<div className="col-md-12" id="content">

							<div className="row" id="title_row">
								<div className="col-md-12">
									<h2 id="page_title" className="pull-left">
										<a href="#" id="page-back-button" className="btn btn-default" title="back">
											<span className="fa fa-chevron-left"></span>
										</a>
										<span id="page-title-icon" className="PAGE_TITLE_ICON_CLASS"></span>
										PAGE_TITLE
									</h2>

									<div id="page_menu" className="pull-right">
										<a href="#" id="page-close-button" className="btn btn-default pull-right" title="Close">
											<span className="fa fa-times"></span>
										</a>
									</div>
								</div>
							</div>

							<p id="page_text">
								PAGE_TEXT
							</p>
						</div>
					</div>

					<div className="row">
						<div id="menu" className="col-sm-3 col-md-2">
							<h2></h2>
						</div>

						<div id="subcontent" className="col-sm-9 col-md-10">
							{this.props.subcontent}
						</div>
					</div>
				</div>
			);
		}
	}
});
