// root-query-type.js
import {
 GraphQLObjectType,
 GraphQLNonNull,
 GraphQLString
} from 'graphql';

import customerType from "./customerType";

export default new GraphQLObjectType({
 name: "Query",
  description:"The root query object",
 fields: () => ({
    customer: {
     type: customerType,
     args: {
       id: {
         type: new GraphQLNonNull(GraphQLString)
       }
     },
     resolve: (_, { id }, { rootValue: { ctx: { backend } } }) => (
       backend.getModel("Customer").load(id)
     )
   }
 })
});
