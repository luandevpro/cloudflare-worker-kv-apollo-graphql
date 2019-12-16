const { ApolloServer } = require('apollo-server-cloudflare');
const { graphqlCloudflare } = require('apollo-server-cloudflare/dist/cloudflareApollo');

const KVCache = require('../kv-cache');
const PokemonAPI = require('../datasources/pokeapi');
const resolvers = require('../resolvers');
const typeDefs = require('../typeDefs');

const dataSources = () => ({
	pokemonAPI: new PokemonAPI(),
});

const kvCache = { cache: new KVCache() };

const createServer = (graphQLOptions, request) =>
	new ApolloServer({
		typeDefs,
		resolvers,
		context: () => {
			const token = request.headers.get('authorization') || '';
			return { user: token };
		},
		introspection: true,
		dataSources,
		...(graphQLOptions.kvCache ? kvCache : {}),
	});

const handler = (request, graphQLOptions) => {
	const server = createServer(graphQLOptions, request);
	return graphqlCloudflare(() => server.createGraphQLServerOptions(request))(request);
};

module.exports = handler;
