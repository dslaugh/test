jest.mock('./getDB');

import ZipLocations from './Ziplocations';

test('ZipLocations', () => {
	const x = ZipLocations.findByZip(84088);
	expect(x).toBe('The zip is: 84088 -- This is the mock: database instance');
});
