const request = require('request-promise-native');

//Dandelion Text Classification API
const checkCategory = (info) => {
  let checkObj = {
    'Movies': 1,
    'Restaurants': 2,
    'Books': 3,
    'Products': 4
  }

  let topCategory = info[0].name;

  for (const key in checkObj) {
    if (key === topCategory) {
      return checkObj[key];
    }
  }
};

const checkDandelionAPI = (search) => {
  let model = process.env.DANDELION_MODEL; //MODEL 2
  let token = process.env.DANDELION_API_TOKEN;
  const baseURL = `https://api.dandelion.eu/datatxt/cl/v1/?text=${search}&model=${model}&min_score=0&include=score_details&token=${token}`;

  return request(baseURL)
    .then(function(res) {
      // Returns null if no category is found
      const results = JSON.parse(res);
      if ((results.categories).length === 0) {
        return null;
      }
      let categoryObj = results.categories;
      return checkCategory(categoryObj);
    });

};

module.exports = { checkDandelionAPI };

//Search Query Tests

// BOOKS
// A PROMISED LAND                                                           //WORKS
// TROUBLES IN PARADISE by Elin Hilderbrand                                  //FAILS
// harry potter                                                              //WORKS
// THE VANISHING HALF: A NOVEL byBrit Bennett                                //WORKS
// One Hundred Years of Solitude                                             //WORKS
// Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones //MISS CATEGORIZES TO MOVIES


// MOVIES
// Titanic                                  //WORKS
// Terminator                               //WORKS
// BORAT SUBSEQUENT MOVIEFILM               //WORKS
// Ratatouille                              //WORKS
// The Wizard of Oz                         //WORKS
// TO ALL THE BOYS: P.S. I STILL LOVE YOU   //MISS CATEGORIZES TO BOOKS
// the movies                               //FAILS

// RESTAURANTS
// Yuga Traditional Indian Kitchen and Bar  //WORKS
// Boston Pizza                             //WORKS
// The Bank and Baron Pub                   //WORKS
// Cactus Club Cafe                         //WORKS
// The Old Spaghetti Factory                //WORKS
// IKUSA Izakaya & Tokyo Market             //WORKS
// Jollibee                                 //WORKS
// Fergus & Bix                             //FAILS

// PRODUCTS
// Nintendo Switch                          //WORKS
// iPhone 12 Pro                            //WORKS
// 2020 Accord Sedan Honda                  //WORKS
// Philips Sunrise Simulation Alarm Clock   //WORKS
// RCA 40" Roku Smart TV, 1080P             //WORKS
