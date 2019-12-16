const { gql } = require('apollo-server-cloudflare');

module.exports = gql`
	type PokemonSprites {
		front_default: String!
		front_shiny: String!
		front_female: String!
		front_shiny_female: String!
		back_default: String!
		back_shiny: String!
		back_female: String!
		back_shiny_female: String!
	}

	type Pokemon {
		id: ID!
		name: String!
		height: Int!
		weight: Int!
		sprites: PokemonSprites!
	}

	type User {
		id: ID!
		posts: [Post]
		email: String!
		username: String!
		password: String!
	}

	type Post {
		id: ID!
		title: String!
		description: String!
		user: User!
	}

	type Query {
		pokemon(id: ID!): Pokemon
		post(id: ID!): Post!
		posts(userId: ID!): [Post]!
		user(id: ID!): User!
		users: [User]!
	}

	type Mutation {
		createUser(email: String!, username: String!, password: String!): User!
		updateUser(id: ID!, username: String, password: String): User!
		deleteUser(id: ID!): User!
		deleteUsers: [User]
		createPost(userId: ID!, title: String!, description: String!): Post!
		deletePosts: [Post]
	}
`;
// updatePost(id: ID!, title: String, description: String): Post!
