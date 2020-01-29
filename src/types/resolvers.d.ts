export type Resolver = (parent: any, args: any, context: any, info: any) => any;

export interface Resolvers {
	[type: string]: {
		[nameOfApi: string]: Resolver;
	};
}
