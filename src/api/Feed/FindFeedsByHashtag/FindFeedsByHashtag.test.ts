// import { JWT } from '../../../constants';
// import { User } from '../../../entities/User';
// import { Feed } from '../../../entities/Feed';
// import { getApi } from '../../../testUtils/api';
// import '../../../testUtils/database';
// import { getQuery } from '../../../testUtils/getQuery';
// import { createJWT } from '../../../utils/jwt';

// describe('[Feed]FindFeedsByHashtag', () => {
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

// 	const query = query {
// 			FindFeedsByHashtag{
// 				res
// 				error
// 			}
// 		}

// 	it('expect to pass', async () => {
// 		const variables = {};
// 		const response = await api
// 			.send({ query: getQuery(query, variables) })
// 			.expect(200)
// 			.then(response => response.body.data.FindFeedsByHashtag);
// 		const {res, error } = response;
// 		expect(res).toBeTruthy();
// 		expect(error).toBeNull();
// 		const result = await Feed.findOne({ ...variables });
// 		expect(result).not.toBeUndefined();
// 		expect(result).toMatchObject(variables);
// 	});

// 	it('expect to fail', async () => {
// 		const variables = {};
// 		const response = await api
// 			.send({ query: getQuery(query, variables) })
// 			.expect(200)
// 			.then(response => response.body.data.FindFeedsByHashtag);
// 		const {res, error } = response;
// 		expect(res).toBeFalsy();
// 		expect(error).toBe('');
// 		const result = await Feed.findOne({ ...variables });
// 		expect(result).toBeUndefined();
// 	});
// });
