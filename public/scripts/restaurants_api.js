const zomato = require('zomato-api');
const client = zomato({
  userKey: process.env.ZOMATO_API_KEY
});

const checkRestoApi = function(search) {
  return client.search({q: `${search}`})
    .then(function(body) {
      return body.results_found;
    })
    .catch(function(err) {
      console.log('Error: ', err.statusCode);
    });
};

module.exports = { checkRestoApi };
