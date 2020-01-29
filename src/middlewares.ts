import { JWT } from "./constants";
import { verifyJWT } from "./utils/jwt";

export const decodeJWT = async (req, res, next): Promise<void> => {
	const token = req.get(JWT);
	if (token) {
		const user = await verifyJWT(token);
		req.user = user;
	}
	next();
};
