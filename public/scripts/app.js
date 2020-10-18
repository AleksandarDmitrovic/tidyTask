$(() => {



//Ajax post request of todos data
$('.filter button').on('click', function(event) {
  event.preventDefault();

  $.ajax({
    method: "GET",
    url: "/api/categories"
  }).done((categories) => {
    for(todo of categories) {
      $("<div>").text(todo).appendTo($(".todos_container"));
    }
  });

  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user in users) {
  //     $("<div>").text(user.name).appendTo($(".todos_container"));
  //   }
  // });


})



});
