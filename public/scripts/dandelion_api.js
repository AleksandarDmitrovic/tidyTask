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
  // console.log('topCategory :', topCategory);

  for (const key in checkObj) {
    if (key === topCategory) {
      // console.log(checkObj[key]);
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
            console.log('error no category found my dandelion api');
            return null;
          }
      let categoryObj = results.categories;
      return checkCategory(categoryObj);
    });

};

module.exports = { checkDandelionAPI };

//Search Query Tests

// BOOKS
// checkDandelionAPI(`A PROMISED LAND`); //WORKS
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
// RCA 40" Roku Smart TV, 1080P //WORKA
