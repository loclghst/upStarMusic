const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
	const minYearsActive =Artist.find({})
		  					.sort({age: 1})
		  					.limit(1)
		  					.then((users) => users[0].age);
		  			
	const maxYearsActive = Artist.find({})
								 .sort({age :-1})
								 .limit(1)
							   	 .then((users) =>users[0].age);
	
	return Promise.all([minYearsActive,maxYearsActive])
				  .then([results] =>{
				  	return {min: results[0], max: results[1]}
				  });

};
