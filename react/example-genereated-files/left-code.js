let customerID = httpRequest.param.id;
var query = `
query getCustomerInfo { customer( id: "customerID" ) { 
   id
   name
  }
} `;

graphql(schema, query).then(result => {
   //send response back to the HTTP caller
   // some additional mapping from result -> result can be made here. E.g. when the caller expects certain kind of JSON or non-JSON format result (XML).
   httpResponse.send( result );
});