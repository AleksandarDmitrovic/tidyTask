const request = require('request-promise-native');

const searchModifer = function(search) {
  let modified = '';
  for (const letter of search) {
    if (letter === ' ') {
      modified += '%20';
    } else if (letter === "'") {
      modified += "\'";
    } else {
      modified += letter;
    }
  }
  return modified;
};

const checkMovieApi = function(search) {
  const api_key = process.env.MOVIES_DB_API_KEY;
  const searchModded =  searchModifer(search);
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${searchModded}&page=1&include_adult=false`;

  return request(url)
    .then(function(body) {
      const results = JSON.parse(body);
      const totalResults = results['total_results'];
      return totalResults;
    })
    .catch(function(err) {
      console.log('Error: ', err.statusCode,);
    });
};

module.exports = { checkMovieApi };
