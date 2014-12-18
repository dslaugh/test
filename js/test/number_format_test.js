test('Sanity Check', function() {
	ok(true, 'This works');
});

test('what', function() {
	equal(numberWithCommas(100000000000.12112312312), '100,000,000,000');
})