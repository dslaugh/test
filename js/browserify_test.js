var names = require('./names.js'),
    foundSuperman = require('./findsuperman.js');

if (foundSuperman(names())) {
    document.write('Found Superman');
} else {
    document.write('No Superman');
}