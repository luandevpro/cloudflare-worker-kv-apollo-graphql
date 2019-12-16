const uuidv4 = require('uuid/v4');

module.exports.Mutation = {
	Mutation: {
		createUser: async (_source, { email, username, password }, context, { dataSources }) => {
			const data = {
				id: uuidv4(),
				email: email,
				username: context.user ? context.user : username,
				password: password,
			};
			await user.put(data.id, JSON.stringify(data));
			const result = await user.get(data.id);
			const resultParse = await JSON.parse(result);
			return {
				id: resultParse.id,
				email: resultParse.email,
				username: resultParse.username,
				password: resultParse.password,
			};
		},
		updateUser: async (_source, { id, username, password }, context, { dataSources }) => {
			const result = await user.get(id);
			const resultParse = await JSON.parse(result);
			const data = {
				id: resultParse.id,
				email: resultParse.email,
				username: username ? username : resultParse.username,
				password: password ? password : resultParse.password,
			};
			await user.put(id, JSON.stringify(data));
			return {
				id: resultParse.id,
				email: resultParse.email,
				username: username ? username : resultParse.username,
				password: password ? password : resultParse.password,
			};
		},
		deleteUser: async (_source, { id }, context, { dataSources }) => {
			const result = await user.get(id);
			const resultParse = await JSON.parse(result);
			await user.delete(id);
			return {
				id: resultParse.id,
				email: resultParse.email,
				username: resultParse.username,
				password: resultParse.password,
			};
		},
		deleteUsers: async (_source, {}, context, { dataSources }) => {
			const userListKeys = await user.list();
			const keys = await userListKeys.keys; // [] keys
			const getValue = keys.map(async (key) => {
				const userId = await key.name;
				const getUser = await user.get(userId);
				await user.delete(userId);
				const userParse = await JSON.parse(getUser);
				return userParse;
			});
			const result = await Promise.all(getValue);
			return result;
		},
		createPost: async (_source, { userId, title, description }, context, { dataSources }) => {
			const data = {
				id: uuidv4(),
				user: userId,
				title: title,
				description: description,
			};
			await post.put(data.id, JSON.stringify(data));
			await post.put(`${userId}@${data.id}`, null);
			const result = await post.get(data.id);
			const resultParse = await JSON.parse(result);
			return {
				id: resultParse.id,
				title: resultParse.title,
				description: resultParse.description,
				user: resultParse.user,
			};
		},
		deletePosts: async (_source, {}, context, { dataSources }) => {
			const postistKeys = await post.list();
			const keys = await postistKeys.keys; // [] keys
			const getValue = keys.map(async (key) => {
				const postId = await key.name;
				const getPost = await post.get(postId);
				await post.delete(postId);
				const postParse = await JSON.parse(getPost);
				return postParse;
			});
			const result = await Promise.all(getValue);
			return result;
		},
		// updatePost: async (_source, { id, title, description },context, { dataSources }) => {
		// 	const result = await post.get(id);
		// 	const resultParse = await JSON.parse(result);
		// 	const data = {
		// 		id: resultParse.id,
		// 		userId: resultParse.userId,
		// 		title: title ? title : resultParse.title,
		// 		description: description ? description : resultParse.description,
		// 	};
		// 	await post.put(id, JSON.stringify(data));
		// 	return data;
		// },
	},
};
