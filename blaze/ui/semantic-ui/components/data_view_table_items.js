Template.TEMPLATE_NAME.rendered = function() {
	/*TEMPLATE_RENDERED_CODE*/
};

Template.TEMPLATE_NAME.events({
	"click td": function(e, t) {
		e.preventDefault();
		/*ON_ITEM_CLICKED_CODE*/
		/*DETAILS_ROUTE*/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		COLLECTION_VAR.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		$('.ui.small.modal.delete').modal({
			closable: true,
			detachable: false,
			onDeny: function() {
				return true;
			},
			onApprove: function() {
				COLLECTION_VAR.remove({ _id: me._id });
			}
		}).modal('show');

		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		/*EDIT_ROUTE*/
		return false;
	}
});

Template.TEMPLATE_NAME.helpers({
	"checked": function(value) { return value ? "checked" : "" }
	/*EDIT_BUTTON_CLASS_HELPER*/

	/*DELETE_BUTTON_CLASS_HELPER*/
});
