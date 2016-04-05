import {Mongo} from "meteor/mongo";

export const COLLECTION_VAR = new Mongo.Collection("COLLECTION_NAME");

COLLECTION_VAR.userCanInsert = function(userId, doc) {
	return INSERT_RULE;
};

COLLECTION_VAR.userCanUpdate = function(userId, doc) {
	return UPDATE_RULE;
};

COLLECTION_VAR.userCanRemove = function(userId, doc) {
	return REMOVE_RULE;
};
