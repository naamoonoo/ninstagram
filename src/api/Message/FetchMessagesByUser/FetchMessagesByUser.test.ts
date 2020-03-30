// import { Message } from '../../../entities/Message';
// import { User } from '../../../entities/User';
// import { JWT } from '../../../types/constants';
// import { createJWT } from '../../../utils/jwt';
// import { getApi } from '../../../utils/testUtils/api';
// import '../../../utils/testUtils/database';
// import { getQuery } from '../../../utils/testUtils/getQuery';

// describe('[Message]FetchMessagesByUser', () => {
// 	let api;
// 	let token;

// 	beforeAll(async () => {
// 		const user = await User.create({
// 			firstName: 'test',
// 			lastName: 'jest',
// 			email: 'test@test.com',
// 			password: 'test'
// 		}).save();
// 		token = createJWT(user.id);
// 	});

// 	beforeEach(() => {
// 		api = getApi().set(JWT, token);
// 	});

// 	const query = mutation {
// 			FetchMessagesByUser{
// 				res
// 				error
// 			}
// 		}

// 	it('expect to pass', async () => {
// 		const variables = {};
// 		const response = await api
// 			.send({ query: getQuery(query, variables) })
// 			.expect(200)
// 			.then(response => response.body.data.FetchMessagesByUser);
// 		const {res, error } = response;
// 		expect(res).toBeTruthy();
// 		expect(error).toBeNull();
// 		const result = await Message.findOne({ ...variables });
// 		expect(result).not.toBeUndefined();
// 		expect(result).toMatchObject(variables);
// 	});

// 	it('expect to fail', async () => {
// 		const variables = {};
// 		const response = await api
// 			.send({ query: getQuery(query, variables) })
// 			.expect(200)
// 			.then(response => response.body.data.FetchMessagesByUser);
// 		const {res, error } = response;
// 		expect(res).toBeFalsy();
// 		expect(error).toBe('');
// 		const result = await Message.findOne({ ...variables });
// 		expect(result).toBeUndefined();
// 	});
// });
