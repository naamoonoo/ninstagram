export const NO_JWT_ERROR = "No JWT authorized, need to login first";

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
