const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {

	//ES5 approach by which we could implement sort
	// sortOrder ={}
	// sortorder[sortproperty] = 1
	// sort(sortOrder)

	const buildQuery = (criteria) =>{
		const query ={};
		if(criteria.age){
			query.age ={
				$gte : criteria.age.min,
				$lte : criteria.age.max
			};
		}

		if(criteria.yearsActive){
			query.yearsActive = {
				$gte : criteria.yearsActive.min,
				$lte:  criteria.yearsActive.max
			},
		}

		if(criteria.name){
			query.$text = {$search : criteria.name};
		}

		return query;
	}

	const query = Artist.find(buildQuery(criteria))
						.sort( [sortproperty] : 1)
						.skip(offset)
						.limit(limit)
	//getting the count of the number of docs is also an asychronous operation


	return Promise.all([query, Artist.find(buildQuery(criteria)).count()])
				  .then((results) =>{
				  		return {
				  			all: results[0],
				  			count: results[1],
				  			offest: offset,
				  			limit: limit
				  		}
				  });


};
