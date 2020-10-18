const checkGoogleBooks = (search) => {
  const baseURL = `https://www.googleapis.com/books/v1/volumes?q={${search}}`;
  $.ajax({
    url: baseURL
  }).then(res => {
    return res.items.length;
  })
  .catch(err => {
    console.error(err);
  });

};



$(() => {
  checkGoogleBooks(`A PROMISED LAND
  by BARACK OBAMA`);

});

// module.exports = { checkGoogleBooks };
