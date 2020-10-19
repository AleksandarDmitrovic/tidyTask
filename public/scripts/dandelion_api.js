$(() => {
  let movie = ['books', 'novels', 'novel']

  let infoObj = {};
  const updateInfo = (info) => {
    infoObj = info
    console.log(infoObj);
    let case1 = movie.forEach(ele => {
      if (infoObj.abstract.includes(ele)) {
        return true
      }
    });
    if (case1) {
      console.log("IT worked")
    }
  };

const checkDandelionAPI = (search) => {
  let model = `8ba5baec-639e-41f8-b66e-36c859ef6804`;
  let token = `8dd5dc731f90406db23fc5fcd4f3f255`;
  const baseURL = `http://api.dandelion.eu/datatxt/nex/v1/?lang=en%20&text=${search}&include=types%2Cabstract%2Ccategories%2Clod&token=${token}`;
  $.ajax({
    url: baseURL
  }).then(res => {
    // console.log(res["annotations"]);
    let dandInfo = res["annotations"]
    updateInfo(dandInfo);
  })
  .catch(err => {
    console.error(err);
  });

};


  // checkDandelionAPI(`A PROMISED LAND
  // by BARACK OBAMA`);

 checkDandelionAPI(`TROUBLES IN PARADISE by Elin Hilderbrand`);
console.log(infoObj);

});

// const checkDandelionAPI = (search) => {
//   let model = `8ba5baec-639e-41f8-b66e-36c859ef6804`;
//   let token = `8dd5dc731f90406db23fc5fcd4f3f255`;
//   const baseURL = `https://api.dandelion.eu/datatxt/cl/models/v1?text=${search}&model=${model}&min_score=0.2&include=score_details&token=${token}`;
//   $.ajax({
//     url: baseURL
//   }).then(res => {
//     console.log(res);
//   })
//     .catch(err => {
//       console.error(err);
//     });

// };

// module.exports = { checkGoogleBooks };

// var dandelion = require("node-dandelion");
// dandelion.configure({
//   "token":"8dd5dc731f90406db23fc5fcd4f3f255"
// });

// let model = `8ba5baec-639e-41f8-b66e-36c859ef6804`;
// let token = `8dd5dc731f90406db23fc5fcd4f3f255`;


// let object = {
//   "string":{
//     "type":"txt",
//     "value":"pizzeria"
//   },
//   "model": "8ba5baec-639e-41f8-b66e-36c859ef6804",
//   "extras": [
//     {
//       "max_annotations": 1
//     },
//     {
//       "min_score": 0.25
//     },
//   ]
// }

// dandelion.txtCl(object, callback);
// // "string", "model" are required.
// // In the "extras" object, you can use any optional parameters from the API.
// // In the "nex_extras" object, you can use any optional parameters from the NEX API.
// // Check the full reference here: https://dandelion.eu/docs/api/datatxt/cl/v1/

// // TXT NEX: Check for specific topics, person, or other types of concepts in the provided text.
// dandelion.txtNex(
//   {
//     "string": {
//       "type":"txt",
//       "value": "\"Loneliness is young Ambitions ladder\" w.Shakespeare"
//     },
//     "extras": [
//       {
//         "min_confidence": 0.7
//       },
//       {
//         "social.hashtag": true
//       },
//       {
//         "social.mention": true
//       },
//       {
//         "include": "types, categories, abstract, image, lod, alternate_labels"
//       },
//       {
//         "epsilon": 0.5
//       }
//     ]
//   },
//   function(results){
//     /***** RESULTS: *****
//     { time: 1,
//     annotations:
//    [ { start: 39,
//        end: 53,
//        spot: 'w\\.Shakespeare',
//        confidence: 0.7779,
//        id: 32897,
//        title: 'William Shakespeare',
//        uri: 'http://en.wikipedia.org/wiki/William_Shakespeare',
//        abstract: 'William Shakespeare (; 26 April 1564 (baptised) – 23 April 1616) was an English ,  and actor, widely regarded as the greatest writer in the English language and the world\'s pre-eminent dramatist. He is often called England\'s national poet and the "Bard of Avon". His extant works, including some collaborations, consist of about 38 plays, 154 sonnets, two long narrative poems, and a few other verses, the authorship of some of which is uncertain. His plays have been translated into every major living language and are performed more often than those of any other playwright.',
//        label: 'William Shakespeare',
//        categories: [Object],
//        types: [Object],
//        alternateLabels: [Object],
//        image: [Object],
//        lod: [Object] } ],
//   lang: 'en',
//   langConfidence: 1,
//   timestamp: '2015-04-24T22:50:33.478' }
//   **********/
//   }
// );

//https://api.dandelion.eu/datatxt/cl/models/v1?text=A%20PROMISED%20LAND%20by%20BARACK%20OBAMA&model=8ba5baec-639e-41f8-b66e-36c859ef6804&min_score=0.2&include=score_details&token=8dd5dc731f90406db23fc5fcd4f3f255

// curl -i --data-urlencode "data@model.json" -d "token=8dd5dc731f90406db23fc5fcd4f3f255"   http://api.dandelion.eu/datatxt/cl/models/v1
// HTTP/1.1 100 Continue

// HTTP/1.1 200 OK
// Date: Sun, 18 Oct 2020 23:50:58 GMT
// Content-Type: application/json;charset=UTF-8
// Content-Length: 1036
// Connection: keep-alive
// Access-Control-Allow-Origin: *
// Vary: Accept-Encoding
// X-Dl-Cl-Models: 1.0
// X-Dl-Request-Id: dceb5b04-c279-4184-4dfe-f9d19c85de40
// X-Envoy-Upstream-Service-Time: 108
// X-Ratelimit-Limit: 1501
// X-Ratelimit-Remaining: 1500
// X-Ratelimit-Reset: 1
// X-Uniapi-Cost: none

// {"id":"8ba5baec-639e-41f8-b66e-36c859ef6804","data":{"lang":"en","categories":[{"name":"Movies","topics":{"https://en.wikipedia.org/wiki/Film":2.0,"https://en.wikipedia.org/wiki/Cinematography":1.0}},{"name":"Restaurants","topics":{"https://en.wikipedia.org/wiki/Restaurant":2.0,"https://en.wikipedia.org/wiki/Types_of_restaurants":1.0,"https://en.wikipedia.org/wiki/Dinner":0.5,"https://en.wikipedia.org/wiki/Fast_food_restaurant":0.5}},{"name":"Books","topics":{"https://en.wikipedia.org/wiki/Book":2.0,"https://en.wikipedia.org/wiki/Novel":1.0,"https://en.wikipedia.org/wiki/Publication":1.0,"https://en.wikipedia.org/wiki/Page_(paper)":0.5}},{"name":"Products","topics":{"https://en.wikipedia.org/wiki/Product_(business)":2.0,"https://en.wikipedia.org/wiki/Goods":1.0,"https://en.wikipedia.org/wiki/Goods_and_services":0.5}}],"description":"Text clasification model that sorts todo list into 4 categories"},"created":"2020-10-18T23:50:58","modified":"2020-10-18T23:50:58","dataType":"cl-model","timestamp":"2020-10-18T23:50:58.133"}vagrant


// HTTP/1.1 200 OK
// Date: Sun, 18 Oct 2020 23:58:56 GMT
// Content-Type: application/json;charset=UTF-8
// Content-Length: 1036
// Connection: keep-alive
// Access-Control-Allow-Origin: *
// Vary: Accept-Encoding
// X-Dl-Cl-Models: 0.0
// X-Dl-Request-Id: f50a90c5-0605-4f0a-5bb4-9c04e05f3532
// X-Envoy-Upstream-Service-Time: 6
// X-Ratelimit-Limit: 1501
// X-Ratelimit-Remaining: 1500
// X-Ratelimit-Reset: 1
// X-Uniapi-Cost: none

// {"id":"8ba5baec-639e-41f8-b66e-36c859ef6804","data":{"lang":"en","categories":[{"name":"Movies","topics":{"https://en.wikipedia.org/wiki/Film":2.0,"https://en.wikipedia.org/wiki/Cinematography":1.0}},{"name":"Restaurants","topics":{"https://en.wikipedia.org/wiki/Restaurant":2.0,"https://en.wikipedia.org/wiki/Types_of_restaurants":1.0,"https://en.wikipedia.org/wiki/Dinner":0.5,"https://en.wikipedia.org/wiki/Fast_food_restaurant":0.5}},{"name":"Books","topics":{"https://en.wikipedia.org/wiki/Book":2.0,"https://en.wikipedia.org/wiki/Novel":1.0,"https://en.wikipedia.org/wiki/Publication":1.0,"https://en.wikipedia.org/wiki/Page_(paper)":0.5}},{"name":"Products","topics":{"https://en.wikipedia.org/wiki/Product_(business)":2.0,"https://en.wikipedia.org/wiki/Goods":1.0,"https://en.wikipedia.org/wiki/Goods_and_services":0.5}}],"description":"Text clasification model that sorts todo list into 4 categories"},"created":"2020-10-18T23:50:58","modified":"2020-10-18T23:50:58","dataType":"cl-model","timestamp":"2020-10-18T23:58:56.130"}vagrant
