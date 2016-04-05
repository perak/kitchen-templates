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
			verificationEmailSent: false,
			errorMessage: ""
		};
	},

	renderErrorMessage() {
		return (
			<div className="alert alert-warning">{this.state.errorMessage}</div>
		);
	},

	onSubmit(e) {
		e.preventDefault();

		this.setState({ errorMessage: "" });

		let self = this;

		let submitButton = $(e.target).find("button[type='submit']");

		getFormData(e.target, {
			onSuccess: function(values) {
				submitButton.button("loading");

				Accounts.createUser({email: values.email, password : values.password, profile: { name: values.name }}, function(err) {
					submitButton.button("reset");
					if(err) {
						if(err.error === 499) {
							self.setState({ verificationEmailSent: true });
						} else {
							self.setState({ errorMessage: err.message });
						}
					} else {
						self.setState({ errorMessage: "" });
						self.setState({ verificationEmailSent: true });
					}
				});
			},
			onError: function(message) {
				self.setState({ errorMessage: message });
			},
			fields: {
				name: { required: true },
				email: { type: "email", required: true },
				password: { required: true }
			}
		});

		return false;
	},

	renderRegisterForm() {
		return (
			<form id="register_form" className="account-form" role="form" onSubmit={this.onSubmit}>
				<h2>Please sign up</h2>

				{this.state.errorMessage ? this.renderErrorMessage() : null}

				<input type="text" name="name" id="register-name" className="form-control" placeholder="Your full name" autoFocus />
				<input id="register-email" name="email" type="text" className="form-control" placeholder="Email address" />
				<input  id="register-password" name="password" type="password" className="form-control" placeholder="Password" />

				<button className="btn btn-lg btn-primary btn-block" type="submit" data-loading-text="Please wait...">Sign up</button>
				<p className="account-form-text-after">Already a member?&nbsp;<a href="{pathFor('login')}">Sign in here</a></p>
			</form>
		);
	},

	renderVerificationMailSent() {
		return (
			<div className="account-form">
				<h2>Thanks for signing up!</h2>
				<p>We've sent verification link to your e-mail address.</p>
				<br />
				<button className="btn btn-lg btn-primary btn-block go-home" type="button" data-loading-text="Please wait...">OK</button>
			</div>
		);
	},

	render() {
		if(this.data.dataLoading) {
			return (<Loading />);
		} else {
			return (
				<div className="page-container" id="content">
					{this.state.verificationEmailSent ? this.renderVerificationMailSent() : this.renderRegisterForm()}
				</div>
			);
		}
	}
});
