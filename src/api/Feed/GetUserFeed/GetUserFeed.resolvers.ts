import { Resolvers } from '../../../types/resolvers';

const resolvers: Resolvers = {
	Query: {
		GetUserFeed: async (_, __, { req }) => {
			return {
				res: true,
				error: null
			};
		}
	}
};

export default resolvers;
