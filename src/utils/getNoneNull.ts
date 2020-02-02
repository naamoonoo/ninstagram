export const getNoneNull = (args: object) => {
	const nonNull = {};
	Object.keys(args).forEach(key => {
		if (args[key] !== null || args[key] !== undefined) {
			nonNull[key] = args[key];
		}
	});
	return nonNull;
};
