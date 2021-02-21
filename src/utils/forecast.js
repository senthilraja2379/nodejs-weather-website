const request = require('request');

const forecast = (longitude, latitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=f4735e0bfeccf897e1a422fc3b8ac440&query=' + encodeURIComponent(latitude) +','+ encodeURIComponent(longitude)+'&units=m';

	request({ url: url, json: true }, (error, { body } = {}) => {
		if (error) {
			callback('Something went wrong connecting to Weather service!');
		} else if (body.error) {
			callback('Unable to find locaton');
		}	else {
			data = body.current.weather_descriptions[0] + 
			'. Current temperature is ' + body.current.temperature + 
			' and ' + body.current.precip + 
			'% chances of rain ';
			callback(undefined, data);
			/* console.log(response.body.current.weather_descriptions[0] + 
				'. Current temperature is ' + response.body.current.temperature + 
				' and ' + response.body.current.precip + 
				'% chances of rain '); */
		}
	
		// console.log('Error : ', error);
		// console.log(response.body);
		// const data = JSON.parse(response.body);
		// console.log(data.current);
		
	});
};

module.exports = forecast;