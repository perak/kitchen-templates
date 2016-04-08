import React from "react";
import {
  Apimoons
}
from "/lib/collections/apimoons.js";
import FormSchema from '/lib/collections/schema-apimoon.js';

// this file should be generated from the application JSON

// used by the the Griddle table
const ApimoonColumns = ["name", "left", "middle", "right", "rowButtons"];

// used with ColumnMeta by the Griddle Table to format certain columns
// used to display object.name name part of nested object.
const DotComponent = React.createClass({
  render: function() {
    //console.log("DotComponent: render this=", this);
    return (
      <span>
		{this.props.data.name}
	</span>
    );
  }
});

// Component which groups row buttons
const ButtonsComponent = React.createClass({
  render: function() {
    console.log("ButtonsComponent: render this=", this);
    const paddingStyle = {
      leftPadding: "5px"
    };

    return (
      <form className="form-inline" style={paddingStyle}>
      <EditComponent rowData={this.props.rowData} /> <DeleteComponent rowData={this.props.rowData} />
		</form>
    );
  }
});

// row button to delete the selected row
const DeleteComponent = React.createClass({

  delete(evt) {
      console.log("DeleteComponent, evt=", evt);
      evt.preventDefault();
      evt.stopPropagation();
      var id = this.props.rowData._id;
      console.log("DeleteComponent, deleting with id=", id);
      // eh, confirm here ? ;)
      let res = confirm("Really delete");
      if (res == true) {
        DeleteObject(id);
      }
      else {
        // not deleted, huh
      }
      return false;
    },
    render: function() {
      console.log("DeleteComponent: render this=", this);
      return (
        <span id="delete-button" onClick={this.delete} className="fa fa-trash-o fa-lg" title="Delete">
     {this.props.data}
			</span>
      );
    }
});

// Row button to "edit" the current row
const EditComponent = React.createClass({
  edit(evt) {
      // console.log("EditComponent, evt=", evt);
      // evt.preventDefault();
      // evt.stopPropagation();
      // var id = this.props.rowData._id;
      // const rowData = this.props.rowData;
      // alert("Editing " + JSON.stringify((rowData)));
      // return false;
    },
    render: function() {
      console.log("EditComponent: render this=", this);
      return (
        <span id="edit-button" onClick={this.edit} className="fa fa-pencil  fa-lg" title="Edit">{this.props.data}
			</span>
      );
    }
});

//


const ListComponent = React.createClass({
  render: function() {
    const value = this.props.data;
    return (
      <span>
		{ value.toString() }
	</span>
    );
  }
});

// now register the DotComponent as customComponent for the specified fields
const ColumnMeta = [{
    "columnName": "left",
    "customComponent": DotComponent
  }, {
    "columnName": "middle",
    "customComponent": DotComponent
  }, {
    "columnName": "right",
    "customComponent": DotComponent
  },

  {

    "columnName": "rowButtons",
    "customComponent": ButtonsComponent,
    "displayName": ""
  }

];

// Used by tcomb-form to specify certain things about how the forms looks like
// https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md#list-with-dynamic-items-different-structs-based-on-selected-value
const FormOptions = {
  fields: {
    _id: {
      type: "static",
      label: "ID"
    },
    left: {
      fields: {
        code: {
          type: "textarea"
        }
      }
    },
    middle: {
      fields: {
        code: {
          type: "textarea"
        }
      }
    },
    right: {
      fields: {
        code: {
          type: "textarea"
        }
      }
    },
    name: {
      type: "text"
    }
  }
};

function DeleteObject(id) {

  console.log("Deleting with id=", id);
  let collection = Apimoons;
  let selector = {
    _id: id
  };
  collection.remove(selector);
}


// this is pretty nasty, and totally different for meteor 1.3 with the client stubs and stuff..
function SaveCollection(document) {

  document = JSON.parse(JSON.stringify(document));
  console.log("Saving values=", document);
  let collection = Apimoons;
  let selector = {
    _id: document._id
  };



  if (collection.findOne(selector) != null) {
    delete document._id;
    collection.update(selector, {
      $set: document
    });
  }
  else {
    delete document._id;
    collection.insert(document);
  }

}


// These are needed by the data_view.jsx
export {
  ApimoonColumns as TableColumns, ColumnMeta as ColumnMeta, FormOptions as FormOptions,
  SaveCollection, DeleteObject
};
