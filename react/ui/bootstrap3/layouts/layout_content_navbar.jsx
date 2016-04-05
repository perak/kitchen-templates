export const TEMPLATE_NAME = React.createClass({
	/*SUBSCRIPTIONS*/

	render() {
		if(this.data.dataLoading) {
			return (<Loading />);
		} else {
			return (
				<div>
					<div id="content" className="sticky-wrapper">
						<div id="navbar" className="navbar" role="navigation">
							<div className="navbar-container">
								<div className="navbar-header">
									<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
										<span className="sr-only">Toggle navigation</span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
									</button>
									<a className="navbar-brand" href="#">APP_TITLE</a>
								</div>

								<div id="menu" className="collapse navbar-collapse">
								</div>

							</div>
						</div>
						<div className="navbar-spacer"></div>

						{this.props.content}
					</div>

					<div id="footer" className="sticky-footer">
						<div className="footer-container">
							<p className="text-muted">FOOTER_TEXT</p>
						</div>
					</div>
				</div>
			);
		}
	}
});
