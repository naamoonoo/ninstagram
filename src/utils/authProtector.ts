export const authProtector = authResolverFunction => async (
	parent,
	args,
	context,
	info
) => {
	if (!context.req.user) {
		throw new Error("No JWT authorized, need to login first");
	}
	return await authResolverFunction(parent, args, context, info);
};
