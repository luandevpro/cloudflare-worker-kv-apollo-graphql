module.exports.Post = {
	Post: {
		user: async (parent) => {
			const result = await user.get(parent.user);
			const userParse = await JSON.parse(result);
			return userParse;
		},
	},
};
