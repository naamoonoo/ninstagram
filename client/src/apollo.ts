import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, concat, Operation, split } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { toast } from "react-toastify";

const isDev = process.env.NODE_ENV === "development";

const getToken = () => {
	const token = localStorage.getItem("jwt-token");
	if (token) {
		return token;
	} else {
		return "";
	}
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
	operation.setContext({
		headers: {
			"jwt-token": getToken()
		}
	});
	return forward(operation);
});

const httpLink = new HttpLink({
	uri: isDev
		? "http://localhost:4000/graphql"
		: "https://project-ninstagram.herokuapp.com/graphql"
});

const wsLink = new WebSocketLink({
	options: {
		connectionParams: {
			"jwt-token": getToken()
		},
		reconnect: true
	},
	uri: isDev
		? "ws://localhost:4000/subscription"
		: "wss://project-ninstagram.herokuapp.com/subscription"
});

const combinedLinks = split(
	({ query }) => {
		const { kind, operation }: any = getMainDefinition(query);
		return kind === "OperationDefinition" && operation === "subscription";
	},
	wsLink,
	httpLink
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message }) =>
			toast.error(`Unexpected error: ${message}`)
		);
	}
	if (networkError) {
		toast.error(`Network error: ${networkError}`);
	}
});

// should fix localStorage => localStorage
// only for test purpose
const localStateLink = withClientState({
	cache,
	defaults: {
		auth: {
			__typename: "Auth",
			isLoggedIn: Boolean(localStorage.getItem("jwt-token"))
		}
	},
	resolvers: {
		Mutation: {
			userLogIn: (_: any, { token }: any, { cache: appCache }: any) => {
				localStorage.setItem("jwt-token", token);
				appCache.writeData({
					data: {
						auth: {
							__typename: "Auth",
							isLoggedIn: true
						}
					}
				});
				return null;
			},
			userLogOut: (_: any, __: any, { cache: appCache }: any) => {
				localStorage.removeItem("jwt-token");
				appCache.writeData({
					data: {
						auth: {
							__typename: "Auth",
							isLoggedIn: false
						}
					}
				});
				return null;
			}
		}
	}
});

const client = new ApolloClient({
	cache,
	link: ApolloLink.from([
		errorLink,
		localStateLink,
		concat(authMiddleware, combinedLinks)
	])
});

export default client;
