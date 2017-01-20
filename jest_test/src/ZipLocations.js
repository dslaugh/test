import getDB from './getDB';

const ZipLocations = {
	findByZip(zip) {
		const x = getDB.create('database instance');
		return 'The zip is: ' + zip + ' -- ' + x;
	}
}

export default ZipLocations;

