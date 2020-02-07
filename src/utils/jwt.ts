import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export const createJWT = (id: string): string => {
	return jwt.sign({ id }, process.env.JWT_TOKEN || "");
};

export const verifyJWT = async (token: string): Promise<User | undefined> => {
	try {
		const verifyResult: any = jwt.verify(
			token,
			process.env.JWT_TOKEN || ""
		);
		if (verifyResult && verifyResult.id) {
			const { id } = verifyResult;
			const user = await User.findOne(
				{
					id
				},
				{ relations: ["likes"] }
			);
			return user;
		}
		return undefined;
	} catch (error) {
		return undefined;
	}
};
