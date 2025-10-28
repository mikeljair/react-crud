const { GraphQLObjectType, GraphQLString, GraphQLFloat } = require('graphql');

const ItemType = new GraphQLObjectType({
    name: 'Item',
    description: 'Representa un ítem del inventario',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
});

module.exports = ItemType;
