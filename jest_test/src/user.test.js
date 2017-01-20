jest.mock('./request');

import * as user from './user';

it('works with promises', () => {
	return user.getUserName(5).then((name) => {
		expect(name).toEqual('Paul');
	});
});
