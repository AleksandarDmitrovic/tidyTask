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
    let model = `9d1a3b7d-5e5c-4cb0-8c94-ea9d17dfd463`; //MODEL 2
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
      console.log('categoryObj :', categoryObj);
      checkCategory(categoryObj);
    })
      .catch(err => {
        console.error(err);
      });

  };

  //Search Query Tests

  // BOOKS
  // checkDandelionAPI(`A PROMISED LAND by BARACK OBAMA`); //WORKS
  // checkDandelionAPI(`TROUBLES IN PARADISE by Elin Hilderbrand`); //FAILS
  // checkDandelionAPI(`harry potter`); //WORKS
  // checkDandelionAPI(`Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones`); //MISS CATEGORIZES TO MOVIES
  // checkDandelionAPI(`THE VANISHING HALF: A NOVEL byBrit Bennett`); //WORKS
  // checkDandelionAPI(`One Hundred Years of Solitude`); //WORKS


  // MOVIES
  // checkDandelionAPI(`Titanic`);  //WORKS
  // checkDandelionAPI(`Terminator`); //WORKS
  // checkDandelionAPI(`BORAT SUBSEQUENT MOVIEFILM`); //WORKS
  // checkDandelionAPI(`Ratatouille`); //WORKS
  // checkDandelionAPI(`The Wizard of Oz`); //WORKS
  // checkDandelionAPI(`TO ALL THE BOYS: P.S. I STILL LOVE YOU`); //MISS CATEGORIZES TO BOOKS
  // checkDandelionAPI(`the movies`); //FAILS

  // RESTAURANTS
  // checkDandelionAPI(`Yuga Traditional Indian Kitchen and Bar`);  //WORKS
  // checkDandelionAPI(`Boston Pizza`); //WORKS
  // checkDandelionAPI(`The Bank and Baron Pub`); //WORKS
  // checkDandelionAPI(`Cactus Club Cafe`); //WORKS
  // checkDandelionAPI(`The Old Spaghetti Factory`); //WORKS
  // checkDandelionAPI(`IKUSA Izakaya & Tokyo Market`); //WORKS
  // checkDandelionAPI(`Jollibee`); //WORKS
  // checkDandelionAPI(`Fergus & Bix`); //FAILS

  // PRODUCTS
  // checkDandelionAPI(`Nintendo Switch`); //WORKS
  // checkDandelionAPI(`iPhone 12 Pro`); //WORKS
  // checkDandelionAPI(`2020 Accord Sedan Honda`); //WORKS
  // checkDandelionAPI(`Philips Sunrise Simulation Bedside Light & FM Radio Alarm Clock`); //WORKS


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

//MODEL 1 CREATION LOGS

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


//MODEL 2 CREATION LOGS
// curl -i --data-urlencode "data@model.json" -d "token=8dd5dc731f90406db23fc5fcd4f3f255"   http://api.dandelion.eu/datatxt/cl/models/v1
// HTTP/1.1 100 Continue

// HTTP/1.1 200 OK
// Date: Tue, 20 Oct 2020 03:21:06 GMT
// Content-Type: application/json;charset=UTF-8
// Content-Length: 2796
// Connection: keep-alive
// Access-Control-Allow-Origin: *
// Vary: Accept-Encoding
// X-Dl-Cl-Models: 1.0
// X-Dl-Request-Id: 37a113ba-8c2d-4dc9-5269-268a876b8e3d
// X-Envoy-Upstream-Service-Time: 31
// X-Ratelimit-Limit: 1501
// X-Ratelimit-Remaining: 1500
// X-Ratelimit-Reset: 1
// X-Uniapi-Cost: none

// {"id":"9d1a3b7d-5e5c-4cb0-8c94-ea9d17dfd463","data":{"lang":"en","categories":[{"name":"Movies","topics":{"https://en.wikipedia.org/wiki/Film":2.0,"https://en.wikipedia.org/wiki/Cinematography":1.0,"https://en.wikipedia.org/wiki/List_of_years_in_film":1.0,"https://en.wikipedia.org/wiki/Filmmaking":0.5,"https://en.wikipedia.org/wiki/History_of_film":0.5,"https://en.wikipedia.org/wiki/Film_industry":0.5}},{"name":"Restaurants","topics":{"https://en.wikipedia.org/wiki/Restaurant":2.0,"https://en.wikipedia.org/wiki/Types_of_restaurants":1.0,"https://en.wikipedia.org/wiki/Cuisine":1.0,"https://en.wikipedia.org/wiki/Kitchen":1.0,"https://en.wikipedia.org/wiki/Bar":1.0,"https://en.wikipedia.org/wiki/Bistro":1.0,"https://en.wikipedia.org/wiki/Take-out":1.0,"https://en.wikipedia.org/wiki/Cooking":1.0,"https://en.wikipedia.org/wiki/Dinner":1.0,"https://en.wikipedia.org/wiki/Fast_food_restaurant":1.0,"https://en.wikipedia.org/wiki/Chinese_cuisine":1.0,"https://en.wikipedia.org/wiki/Italian_cuisine":1.0,"https://en.wikipedia.org/wiki/French_cuisine":1.0,"https://en.wikipedia.org/wiki/Japanese_cuisine":1.0,"https://en.wikipedia.org/wiki/Indian_cuisine":1.0,"https://en.wikipedia.org/wiki/Spanish_cuisine":1.0,"https://en.wikipedia.org/wiki/Mexican_cuisine":1.0,"https://en.wikipedia.org/wiki/Thai_cuisine":1.0,"https://en.wikipedia.org/wiki/Greek_cuisine":1.0}},{"name":"Books","topics":{"https://en.wikipedia.org/wiki/Book":2.0,"https://en.wikipedia.org/wiki/Novel":1.0,"https://en.wikipedia.org/wiki/Fiction":1.0,"https://en.wikipedia.org/wiki/Romance_novel":1.0,"https://en.wikipedia.org/wiki/Book_series":1.0,"https://en.wikipedia.org/wiki/Publication":1.0,"https://en.wikipedia.org/wiki/Page_(paper)":0.5}},{"name":"Products","topics":{"https://en.wikipedia.org/wiki/Product_(business)":2.0,"https://en.wikipedia.org/wiki/Goods":1.0,"https://en.wikipedia.org/wiki/Toy":1.0,"https://en.wikipedia.org/wiki/Electronics":1.0,"https://en.wikipedia.org/wiki/Camera":1.0,"https://en.wikipedia.org/wiki/Video_game":1.0,"https://en.wikipedia.org/wiki/Clothing":1.0,"https://en.wikipedia.org/wiki/Shoe":1.0,"https://en.wikipedia.org/wiki/Jewellery":1.0,"https://en.wikipedia.org/wiki/Car":1.0,"https://en.wikipedia.org/wiki/List_of_Amazon_products_and_services":1.0,"https://en.wikipedia.org/wiki/Apple_Inc.":1.0,"https://en.wikipedia.org/wiki/Google":1.0,"https://en.wikipedia.org/wiki/Walmart":1.0,"https://en.wikipedia.org/wiki/Brand":1.0,"https://en.wikipedia.org/wiki/Microsoft":1.0,"https://en.wikipedia.org/wiki/Philips":1.0,"https://en.wikipedia.org/wiki/Goods_and_services":0.5}}],"description":"Text clasification model that sorts todo list into 4 categories"},"created":"2020-10-20T03:21:06","modified":"2020-10-20T03:21:06","dataType":"cl-model","timestamp":"2020-10-20T03:21:06.436"}vagrant
