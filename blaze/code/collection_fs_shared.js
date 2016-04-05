this.COLLECTION_VAR = new FS.Collection("COLLECTION_NAME", {
	stores: [new FS.Store.GridFS("COLLECTION_NAME")]
});

this.COLLECTION_VAR.userCanInsert = function(userId, doc) {
	return INSERT_RULE;
};

this.COLLECTION_VAR.userCanUpdate = function(userId, doc) {
	return UPDATE_RULE;
};

this.COLLECTION_VAR.userCanRemove = function(userId, doc) {
	return REMOVE_RULE;
};

this.COLLECTION_VAR.userCanDownload = function(userId, doc) {
	return DOWNLOAD_RULE;
};
