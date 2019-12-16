module.exports.Query = {
	Query: {
		pokemon: async (_source, { id }, context, { dataSources }) => {
			return dataSources.pokemonAPI.getPokemon(id);
		},
		user: async (_source, { id }, { dataSources }) => {
			const data = await user.get(id);
			const result = await JSON.parse(data);
			return {
				id: result.id,
				email: result.email,
				username: result.username,
				password: result.password,
			};
		},
		users: async (_source, {}, context, { dataSources }) => {
			const userListKeys = await user.list();
			const keys = await userListKeys.keys; // [] keys
			const getValue = keys.map(async (key) => {
				const userId = await key.name;
				const getUser = await user.get(userId);
				const userParse = await JSON.parse(getUser);
				return userParse;
			});
			const result = await Promise.all(getValue);
			return result;
		},
		post: async (_source, { id }, context, { dataSources }) => {
			const result = await post.get(id);
			const resultParse = await JSON.parse(result);
			return resultParse;
		},
		posts: async (_source, { userId }, context, { dataSources }) => {
			const user = await post.list({ prefix: userId });
			const keys = await user.keys; // [] keys
			const getValue = keys.map(async (key) => {
				const postId = await key.name.split('@')[1];
				const getPost = await post.get(postId);
				const postParse = await JSON.parse(getPost);
				return postParse;
			});
			const result = await Promise.all(getValue);
			return result;
		},
	},
};
