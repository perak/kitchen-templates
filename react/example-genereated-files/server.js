import {
	Users
}
from "meteor-user-roles";
import { Apimoons } from "/lib/collections/apimoons.js";

Meteor.publish("users", () => {
	console.log("in publish users");
	return Meteor.users.find( {}, {fields: {"profile.name":1} });
});

Meteor.startup(function() {
	// read environment variables from Meteor.settings
	if (Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for (var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}


	console.log("In server startup..");
	Apimoons.remove({});
	let leftCode = Assets.getText("left-code.js");
	let middleCode = Assets.getText("middle-code.js");
	let rightCode = Assets.getText("right-code.js");

	for (let i = 0; i < 10; i++) {

		Apimoons.insert({
			name: "API " + i,
			"left": {
				name: "HTTP REST INPUT",
				code: leftCode

			},
			middle: {
				name: "GraphQL Schema",
				code: middleCode

			},
			right: {
				name: "GraphQL Resolver to HTTP REST",
				code: rightCode

			},
		});
	}

});
