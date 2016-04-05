var TEMPLATE_NAMEGotoFirstLink = function() {
	var firstLink = $(".tree-view-item-link");
	if(!firstLink.length) {
		firstLink = $(".tree-view-dir-link");
	}
	if(firstLink.length) {
		firstLink.click();
	}	
}

Template.TEMPLATE_NAME.rendered = function() {
	var fileId = this.data.params.fileId;

	if(!fileId || fileId == "null") {
		TEMPLATE_NAMEGotoFirstLink();
		return;
	}
	pageSession.set("TEMPLATE_NAMESelectedItem", fileId);
};

Template.TEMPLATE_NAME.events({

});

Template.TEMPLATE_NAME.helpers({

});


Template.TEMPLATE_NAMEDirs.rendered = function() {
}

Template.TEMPLATE_NAMEDirs.events({
	"click .tree-view-dir-link": function(e, t) {
		pageSession.set("TEMPLATE_NAMESelectedItem", this._id);
		if(e.target != e.currentTarget) return true;
		e.preventDefault();
		COLLECTION_VAR.update({ _id: this._id }, { $set: { expanded: !this.expanded } });

		/*FOLDER_ROUTE*/
		return false;
	},
	"click .tree-view-dir-rename": function(e, t) {
		var data = {
			data: this,
			mode: "rename",
			filename: this.ITEM_NAME_FIELD
		};

		bootboxDialog("TEMPLATE_NAMEFilenameModal", data, {
			title: "Rename",
			animate: false
		});
	},
	"click .tree-view-dir-new-file": function(e, t) {
		var data = {
			data: this,
			mode: "new-file",
			filename: ""
		};

		bootboxDialog("TEMPLATE_NAMEFilenameModal", data, {
			title: "New File",
			animate: false
		});
	},
	"click .tree-view-dir-new-dir": function(e, t) {
		var data = {
			data: this,
			mode: "new-dir",
			filename: ""
		};

		bootboxDialog("TEMPLATE_NAMEFilenameModal", data, {
			title: "New Folder",
			animate: false
		});
	},

	"click .tree-view-dir-delete": function(e, t) {
		e.preventDefault();
		var self = this;
		bootbox.dialog({
			message: "Delete \"" + self.ITEM_NAME_FIELD + "\"?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						COLLECTION_VAR.remove({ _id: self._id }, function(e, r) {
							TEMPLATE_NAMEGotoFirstLink();
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	}
});

Template.TEMPLATE_NAMEDirs.helpers({
	"dirs": function() {
		return COLLECTION_VAR.find({ parentId: this.parentId, ITEM_TYPE_FIELD: "dir" });
	},
	"dirItemClass": function() {
		return this.expanded ? "" : "collapsed";
	},
	"dirIconClass": function() {
		return this.expanded ? "EXPANDED_ICON_CLASS" : "COLLAPSED_ICON_CLASS";
	},
	"itemClass": function() {
		return this._id === pageSession.get("TEMPLATE_NAMESelectedItem") ? "active" : "";
	},
	"gotParent": function() {
		return !!this.parentId;
	}
});

Template.TEMPLATE_NAMEItems.events({
	"click .tree-view-item-link": function(e, t) {
		pageSession.set("TEMPLATE_NAMESelectedItem", this._id);
		if(e.target != e.currentTarget) return true;
		e.preventDefault();
		/*ITEM_ROUTE*/
		return false;
	},

	"click .tree-view-item-rename": function(e, t) {
		var data = {
			data: this,
			mode: "rename",
			filename: this.ITEM_NAME_FIELD
		};

		bootboxDialog("TEMPLATE_NAMEFilenameModal", data, {
			title: "Rename",
			animate: false
		});
	},

	"click .tree-view-item-delete": function(e, t) {
		e.preventDefault();
		var self = this;
		bootbox.dialog({
			message: "Delete \"" + self.ITEM_NAME_FIELD + "\"?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						COLLECTION_VAR.remove({ _id: self._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	}
});

Template.TEMPLATE_NAMEItems.helpers({
	"items": function() {
		return COLLECTION_VAR.find({ parentId: this.parentId, ITEM_TYPE_FIELD: "item" });
	},
	"itemClass": function() {
		return this._id === pageSession.get("TEMPLATE_NAMESelectedItem") ? "active" : "";
	}
});


Template.TEMPLATE_NAMEFilenameModal.rendered = function() {
	pageSession.set("TEMPLATE_NAMEFilenameModalErrorMessage", "");
	$("input[autofocus]").focus();
};

Template.TEMPLATE_NAMEFilenameModal.helpers({
	"TEMPLATE_NAMEFilenameModalErrorMessage": function() {
		return pageSession.get("TEMPLATE_NAMEFilenameModalErrorMessage");
	}
});

Template.TEMPLATE_NAMEFilenameModal.events({
	"submit": function(e, t) {
		var self = this;
		pageSession.set("TEMPLATE_NAMEFilenameModalErrorMessage", "");

		function submitAction(newId) {
			bootbox.hideAll();
			if(newId) {
				COLLECTION_VAR.update({ _id: self.data._id }, { $set: { expanded: true } }, function(e) {
					$("a[data-id='" + newId + "']").click();
				});
			}
		}

		function errorAction(msg) {
			var message = msg || "Error.";
			pageSession.set("TEMPLATE_NAMEFilenameModalErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				if(self.mode === "rename") {
					var duplicate = COLLECTION_VAR.findOne({ _id: { $ne: self.data._id }, parentId: self.data.parentId, ITEM_NAME_FIELD: values.filename });
					if(duplicate) {
						errorAction("\"" + values.filename + "\" already exists.");
						return false;
					}

					COLLECTION_VAR.update({ _id: self.data._id }, { $set: { ITEM_NAME_FIELD: values.filename } }, function(e) { 
						if(e)
							errorAction(e.message);
						else
							submitAction(); 
					});
				}

				if(self.mode == "new-file") {
					var duplicate = COLLECTION_VAR.findOne({ _id: { $ne: self.data._id }, parentId: self.data._id, ITEM_NAME_FIELD: values.filename });
					if(duplicate) {
						errorAction("\"" + values.filename + "\" already exists.");
						return false;
					}


					var val = QUERY_FILTER;
					var itemNameField = "ITEM_NAME_FIELD";
					if(itemNameField) val[itemNameField] = values.filename;
					val.parentId = self.data._id;
					val.type = "item";

					COLLECTION_VAR.insert(val, function(e, r) {
						if(e)
							errorAction(e.message);
						else
							submitAction(r); 
					});
				}

				if(self.mode == "new-dir") {
					var duplicate = COLLECTION_VAR.findOne({ _id: { $ne: self.data._id }, parentId: self.data._id, ITEM_NAME_FIELD: values.filename });
					if(duplicate) {
						errorAction("\"" + values.filename + "\" already exists.");
						return false;
					}

					var val = QUERY_FILTER;
					var itemNameField = "ITEM_NAME_FIELD";
					if(itemNameField) val[itemNameField] = values.filename;
					val.parentId = self.data._id;
					val.type = "dir";

					COLLECTION_VAR.insert(val, function(e, r) {
						if(e)
							errorAction(e.message);
						else
							submitAction(r);
					});
				}
			}
		);

		return false;

	},

	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		bootbox.hideAll();

		return false;
	}
});
