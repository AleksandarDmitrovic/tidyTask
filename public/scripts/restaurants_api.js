const zomato = require('zomato-api');
const client = zomato({
  userKey: process.env.ZOMATO_API_KEY
});

const checkRestoApi = function(search) {
  return client.search({q: `${search}`})
  .then(function(body) {
    console.log(body.results_found);
  })
  .catch(function(err) {
    console.log('Error: ', err.statusCode);
  });
};

module.exports = { checkRestoApi };

// $(() => {

// const updateAPIOutput = (output) => {
//   $('.todos_container h4').text(output)
// };

// const fetchMyIP = async function() {

//   const results = await $.ajax({
//     url: `https://api.ipify.org?format=json`
//   }).then(res => {
//     let ip = res.ip
//     return ip
//     // updateAPIOutput(ip)
//   })
//   .catch(err => {
//     console.error(err);
//   })
//   return results;
// };



// const fetchCoordsByIP = async function(ip) {


//   const results = await $.ajax({
//     url:(`https://ipvigilante.com/json/` + ip),
//     type: 'GET',
//     crossDomain: true,
//     headers: {
//       'Access-Control-Allow-Origin': '*'
//     }
//   }).then(res => {
//     console.log(res)
//   })
//   .catch(err => {
//     console.error(err);
//   })
//   return results;
// };


// $('.todos_container form').submit(event => {
//   event.preventDefault();
//   const getAPI = async() => {
//     let myIP = await fetchMyIP();
//     console.log('myIP :', myIP);
//     let cordsByIP = await fetchCoordsByIP(myIP);
//     console.log('cordsByIP :', cordsByIP);

//   };
//   getAPI();


// })





// });
