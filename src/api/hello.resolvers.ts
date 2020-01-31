import { Verification } from "../entities/Verification";

export default {
	Query: {
		hello: () => {
			return Verification.find({});
		}
	}
};
