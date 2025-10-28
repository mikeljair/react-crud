const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');
const UserType = require('./types/userType');
const ItemType = require('./types/itemType');
const userResolver = require('./resolvers/userResolver');
const itemResolver = require('./resolvers/itemResolver');
const {GraphQLFloat} = require("graphql/index");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: 'Lista de todos los usuarios',
            resolve: userResolver.users
        },
        items: {
            type: new GraphQLList(ItemType),
            description: 'Lista de todos los ítems',
            resolve: itemResolver.items
        }
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        item_Create: {
            type: ItemType,
            description: 'Crear un nuevo ítem',
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLString},
                price: {type: GraphQLFloat},
            },
            resolve: itemResolver.item_create
        },
        item_update: {
            type: ItemType,
            description: 'Actualizar un ítem por ID',
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                price: {type: GraphQLFloat},
            },
            resolve: itemResolver.item_update
        },
        item_delete: {
            type: ItemType,
            description: 'Eliminar un ítem por ID',
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve: itemResolver.item_delete
        },


        // user_Create: {
        //   type: UserType,
        //   description: 'Crear un nuevo usuario',
        //   args: {
        //     dni: { type: new GraphQLNonNull(GraphQLString) },
        //     nombres: { type: new GraphQLNonNull(GraphQLString) },
        //     correo: { type: GraphQLString },
        //   },
        //   resolve: userResolver.user_create
        // },
    }),
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

module.exports = schema;
