module.exports.User = {
	User: {
		posts: async (parent) => {
			const user = await post.list({ prefix: parent.id });
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
