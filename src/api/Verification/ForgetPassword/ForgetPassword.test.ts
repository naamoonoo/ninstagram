// import { Verification } from '../../../entities/Verification';
// import { getApi } from '../../../testUtils/api';
// import '../../../testUtils/database';
// import { getQuery } from '../../../testUtils/getQuery';

// describe('[Verification]ForgetPassword', () => {
// 	let api;

// 	beforeEach(() => {
// 		api = getApi();
// 	});

// 	const query = query {
// 			ForgetPassword(
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
// 			.then(response => response.body.data.ForgetPassword);
// 		const {res, error } = response;
// 		expect(res).toBeTruthy();
// 		expect(error).toBeNull();
// 		const result = await Verification.findOne({ ...variables });
// 		expect(result).not.toBeUndefined();
// 		expect(result).toMatchObject(variables);
// 	});

// 	it('expect to fail', async () => {
// 		const variables = {};
// 		const response = await api
// 			.send({ query: getQuery(query, variables) })
// 			.expect(200)
// 			.then(response => response.body.data.ForgetPassword);
// 		const {res, error } = response;
// 		expect(res).toBeFalsy();
// 		expect(error).toBe('');
// 		const result = await Verification.findOne({ ...variables });
// 		expect(result).toBeUndefined();
// 	});
// });
