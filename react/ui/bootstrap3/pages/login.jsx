import React from "react";
import {Meteor} from "meteor/meteor";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {getFormData} from "/client/lib/form_utils";
import {Loading} from "/client/pages/loading/loading.jsx";
/*IMPORTS*/

export const TEMPLATE_NAME = React.createClass({
	/*SUBSCRIPTIONS*/

	getInitialState() {
		return {
			errorMessage: ""
		};
	},

	renderErrorMessage() {
		return (<div className="alert alert-warning">{this.state.errorMessage}</div>);
	},

	onSubmit(e) {
		e.preventDefault();
		this.setState({ errorMessage: "" });

		let self = this;

		let submitButton = $(e.target).find("button[type='submit']");

		getFormData(e.target, {
			onSuccess: function(values) {
				submitButton.button("loading");
				Meteor.loginWithPassword(values.email, values.password, function(err) {
					submitButton.button("reset");
					if(err) {
						self.setState({ errorMessage: err.message });
						return false;
					}
				});
			},
			onError: function(message) {
				self.setState({ errorMessage: message });
			},
			fields: {
				email: { type: "email", required: true },
				password: { required: true }
			}
		});

		return false;
	},

	render() {
		if(this.data.dataLoading) {
			return (<Loading />);
		} else {
			return (
				<div className="page-container" id="content">
					<form id="login_form" className="account-form" role="form" onSubmit={this.onSubmit}>
						<h2>Please sign in</h2>

						{this.state.errorMessage ? this.renderErrorMessage() : null}

						<button id="login-with-google" type="button" className="btn btn-default btn-block" data-loading-text="Please wait..."><span className="fa fa-google-plus-square"></span>&nbsp;Sign in with Google</button>
						<button id="login-with-github" type="button" className="btn btn-default btn-block" data-loading-text="Please wait..."><span className="fa fa-github"></span>&nbsp;Sign in with GitHub</button>
						<button id="login-with-facebook" type="button" className="btn btn-default btn-block" data-loading-text="Please wait..."><span className="fa fa-facebook-official"></span>&nbsp;Sign in with Facebook</button>
						<button id="login-with-twitter" type="button" className="btn btn-default btn-block" data-loading-text="Please wait..."><span className="fa fa-twitter"></span>&nbsp;Sign in with Twitter</button>
						<button id="login-with-linkedin" type="button" className="btn btn-default btn-block" data-loading-text="Please wait..."><span className="fa fa-linkedin-square"></span>&nbsp;Sign in with LinkedIn</button>
						<button id="login-with-meteor" type="button" className="btn btn-default btn-block" data-loading-text="Please wait..."><span className="fa fa-meteor"></span>&nbsp;Sign in with Meteor</button>

						<div id="login-with-password">
							<input type="text" id="login-email" name="email" className="form-control" placeholder="Email address" autoFocus />
							<input type="password" id="login-password" name="password" className="form-control" placeholder="Password" />

							<button className="btn btn-lg btn-primary btn-block" type="submit" data-loading-text="Please wait...">Sign in</button>

							<p className="account-form-text-after" id="register-link">Not a member?&nbsp;<a href={pathFor('register')}>Sign up here</a></p>
							<p className="account-form-text-after" id="forgot-password-link">Forgot password?&nbsp;<a href={pathFor('forgot_password')}>Click here</a></p>
						</div>
					</form>
				</div>
			);
		}
	}
});
