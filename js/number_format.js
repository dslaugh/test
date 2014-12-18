var numberWithCommas = function(num) {
	num = num.toString();
	return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};