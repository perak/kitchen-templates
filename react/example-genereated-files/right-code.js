// customerType.js
import {
 GraphQLString,
 GraphQLArray,
 GraphQLObjectType,
} from 'graphql';

import invoiceType from "./invoiceType";

export default new GraphQLObjectType({
 name: 'Customer',
 description: 'A Customer',
 fields: () => ({
   id: {
     type: GraphQLString,
     resolve: it => it.uuid
   },

   name: { type: GraphQLString },

   invoices: {
     type: new GraphQLArray(invoiceType),
     resolve: it => it.invoices()
   }
 })
});

