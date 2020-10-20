$(() => {

  //Dandelion Text Classification API

  const checkCategory = (info) => {
    let checkObj = {
      'Movies': 1,
      'Restaurants': 2,
      'Books': 3,
      'Products': 4
    }

    let topCategory = info[0].name;
    console.log('topCategory :', topCategory);

    for (const key in checkObj) {
      if (key === topCategory) {
        console.log(checkObj[key]);
        return checkObj[key];
      }
    }
  };

  const checkDandelionAPI = (search) => {
    let model = `8ba5baec-639e-41f8-b66e-36c859ef6804`; //FIRST MODEL
    let token = `8dd5dc731f90406db23fc5fcd4f3f255`;
    const baseURL = `https://api.dandelion.eu/datatxt/cl/v1/?text=${search}&model=${model}&min_score=0&include=score_details&token=${token}`;
    $.ajax({
      url: baseURL
    }).then(res => {
      //Returns null if no category is found
      if ((res.categories).length === 0) {
        console.log('error no category found my dandelion api');
        return null;
      }
      let categoryObj = res.categories;
      checkCategory(categoryObj);
    })
      .catch(err => {
        console.error(err);
      });

  };

  // BOOKS
  // checkDandelionAPI(`A PROMISED LAND by BARACK OBAMA`); //WORKS
  // checkDandelionAPI(`TROUBLES IN PARADISE by Elin Hilderbrand`); //FAILS
  // checkDandelionAPI(`harry potter`); //WORKS

  // MOVIES
  // checkDandelionAPI(`Titanic`);  //WORKS
  // checkDandelionAPI(`Terminator`); //WORKS
  // checkDandelionAPI(`the movies`); //FAILS

  // RESTAURANTS
  // checkDandelionAPI(`Yuga Traditional Indian Kitchen and Bar`);  //WORKS
  // checkDandelionAPI(`Boston Pizza`); //WORKS
  checkDandelionAPI(`Fergus & Bix`); //FAILS

  // PRODUCTS
  // checkDandelionAPI(`range of product lines`);  //MISS CATEGORIZES TO BOOKS
  // checkDandelionAPI(`Nintendo Switch`); //WORKS
  // checkDandelionAPI(`iPhone 6s`); //WORKS


  // module.exports = { checkDandelionAPI , checkCategory };
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



  // //DANDELION Entity Extraction API
  // let infoObj = {};
  // let books = ['books', 'novels', 'novel'];
  // let movies = ['movie', 'movies', 'film', 'films',];
  // let restaurant = ['restaurant', 'restaurants', 'kitcken', 'cafe'];
  // let products = ['brand', ]

  // const checkCategory = (info) => {
  //   infoObj = info
  //   console.log('infoObj :', infoObj);
  //   let bookScore = 0;
  //   let movieScore = 0;

  //   let abstract = (infoObj["0"]["abstract"]).toString();
  //   console.log('abstract :', abstract);

  //   books.forEach(ele => {
  //     if (abstract.includes(ele)) {
  //       console.log('ITS A BOOK');
  //       bookScore ++;
  //       console.log('bookScore :', bookScore);
  //     }
  //   });

  //   movies.forEach(ele => {
  //     if (abstract.includes(ele)) {
  //       console.log('ITS A MOVIE');
  //       movieScore ++;
  //       console.log('movieScore :', movieScore);
  //     }
  //   });

  //   return [bookScore, movieScore];
  // };

  // const checkDandelionAPI = (search) => {
  //   // let model = `8ba5baec-639e-41f8-b66e-36c859ef6804`;
  //   let token = `8dd5dc731f90406db23fc5fcd4f3f255`;
  //   const baseURL = `http://api.dandelion.eu/datatxt/nex/v1/?lang=en%20&text=${search}&include=types%2Cabstract%2Ccategories%2Clod&token=${token}`;
  //   $.ajax({
  //     url: baseURL
  //   }).then(res => {
  //     // console.log(res["annotations"]);
  //     let dandInfo = res["annotations"]
  //     checkCategory(dandInfo);
  //   })
  //     .catch(err => {
  //       console.error(err);
  //     });

  // };

  // // BOOKS
  // // checkDandelionAPI(`A PROMISED LAND by BARACK OBAMA`);
  // //  checkDandelionAPI(`TROUBLES IN PARADISE by Elin Hilderbrand`);
  // // MOVIES
  // checkDandelionAPI(`Titanic`);
  //---------------------------------------------------------------------------------------------------------------------------------//



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
