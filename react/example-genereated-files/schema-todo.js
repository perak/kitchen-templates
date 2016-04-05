import t from 'tcomb-form'

// this file should be generated from the application JSON

// see server.js for a example Apimoons.insert clauses which should match with this schema

// https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md


var ss = "SIMPLE_SCHEMA";

const Schema = t.struct({
  _id: t.maybe( t.String ),
  name: t.String, // a required string
  owner: t.maybe( t.String ),
  sharedTo: t.list( t.String ),
  done:  t.Boolean
  
})

// Import with  import FormSchema from "schema-apimoon.js";
export default Schema;
