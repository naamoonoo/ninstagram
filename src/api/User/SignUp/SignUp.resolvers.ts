import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
	Mutation: {
		SignUp: async (_, args, { req }) => {
			return {
				res: true,
				error: null
			};
		}
	}
};

export default resolvers;
