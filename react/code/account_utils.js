import {Meteor} from "meteor/meteor";

export const userEmail = function() {
	let user = Meteor.user();
	if(!user || !user.emails || !user.emails.length) {
		return "";
	}

	let email = user.emails[0];

	return email.address || "";
};

export const userFullName = function() {
	let user = Meteor.user();
	if(!user || !user.profile) {
		return "";
	}

	return user.profile.name;
};
