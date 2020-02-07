export const NO_JWT_ERROR = "To fully enjoy ninstagram, please Login first :)";

export const authProtector = authResolverFunction => async (
	parent,
	args,
	context,
	info
) => {
	if (!context.req.user) {
		throw new Error(NO_JWT_ERROR);
	}
	return await authResolverFunction(parent, args, context, info);
};
