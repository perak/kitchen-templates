import t from 'tcomb-form'

// this file should be generated from the application JSON

// see server.js for a example Apimoons.insert clauses which should match with this schema

// https://github.com/gcanti/tcomb-form/blob/master/GUIDE.md



// Import with  import FormSchema from "schema-apimoon.js";
export default function() {
  const ApimoonSchema = t.struct({
    _id: t.maybe(t.String),
    name: t.String, // a required string
    left: t.struct({
      name: t.String,
      code: t.String
    }),
    middle: t.struct({
      name: t.String,
      code: t.String
    }),
    right: t.struct({
      name: t.String,
      code: t.String
    }),
  });
  return ApimoonSchema;
}