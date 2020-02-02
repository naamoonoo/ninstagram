interface IVariables {
	[key: string]: any;
}
export const getQuery = (query: string, variables?: IVariables) => {
	if (variables) {
		Object.keys(variables).forEach(key => {
			const value: any =
				typeof variables[key] === "string"
					? `"${variables[key]}"`
					: `${variables[key]}`;
			const idx = query.indexOf(`$${key}`);
			query =
				query.substring(0, idx) +
				value +
				query.substring(idx + key.length + 1);
		});
	}
	return query;
};
