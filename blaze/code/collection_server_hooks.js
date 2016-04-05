COLLECTION_VAR.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	/*BEFORE_INSERT_CODE*/
});

COLLECTION_VAR.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPDATE_CODE*/
});

COLLECTION_VAR.before.remove(function(userId, doc) {
	/*BEFORE_REMOVE_CODE*/
});

COLLECTION_VAR.after.insert(function(userId, doc) {
	/*AFTER_INSERT_CODE*/
});

COLLECTION_VAR.after.update(function(userId, doc, fieldNames, modifier, options) {
	/*AFTER_UPDATE_CODE*/
});

COLLECTION_VAR.after.remove(function(userId, doc) {
	/*AFTER_REMOVE_CODE*/
});
