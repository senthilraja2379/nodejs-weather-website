const request = require('request')

const geocode = (location, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token=pk.eyJ1Ijoic2VudGhpbDIzIiwiYSI6ImNrbDFydXZwZDAwZHEydnB0N20xd283bzUifQ.83ZO37qtCgwy8PV-S-Q1-w&limit=1';
	
	request({ url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Something went wrong connecting to Weather service!');
		} else if (body.features.length === 0) {
			callback('Unable to find locaton, Try another location!')
		}	else {
			callback(undefined, {
				longitude: body.features[0].center[0],
				latitude: body.features[0].center[1],
				fullCity: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;