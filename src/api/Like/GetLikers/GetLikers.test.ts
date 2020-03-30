// import { Like } from '../../../entities/Like';
// import { getApi } from '../../../testUtils/api';
// import '../../../testUtils/database';
// import { getQuery } from '../../../testUtils/getQuery';

// describe('[Like]GetLikers', () => {
// 	let api;

// 	beforeEach(() => {
// 		api = getApi();
// 	});

// 	const query = query {
// 			GetLikers(
// 			) {
// 				res
// 				error
// 			}
// 		}

// 	it('expect to pass', async () => {
// 		const variables = {};
// 		const response = await api
// 			.send({ query: getQuery(query, variables) })
// 			.expect(200)
// 			.then(response => response.body.data.GetLikers);
// 		const {res, error } = response;
// 		expect(res).toBeTruthy();
// 		expect(error).toBeNull();
// 		const result = await Like.findOne({ ...variables });
// 		expect(result).not.toBeUndefined();
// 		expect(result).toMatchObject(variables);
// 	});

// 	it('expect to fail', async () => {
// 		const variables = {};
// 		const response = await api
// 			.send({ query: getQuery(query, variables) })
// 			.expect(200)
// 			.then(response => response.body.data.GetLikers);
// 		const {res, error } = response;
// 		expect(res).toBeFalsy();
// 		expect(error).toBe('');
// 		const result = await Like.findOne({ ...variables });
// 		expect(result).toBeUndefined();
// 	});
// });
