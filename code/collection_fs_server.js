COLLECTION_VAR.allow({
	insert: function (userId, doc) {
		return COLLECTION_VAR.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return COLLECTION_VAR.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return COLLECTION_VAR.userCanRemove(userId, doc);
	},

	download: function (userId, doc) {
		return COLLECTION_VAR.userCanDownload(userId, doc);
	}
});
