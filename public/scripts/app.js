const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));

  return div.innerHTML;
};
const createTodoInstance = function(todo) {
  const title = escape(todo);
  const $instance = `
  <div class="to-do-instance">
    <p>${title}</p>
    <span>
      <button class="btn btn-outline-secondary">Edit</button>
      <button class="btn btn-outline-danger">Delete</button>
    </span>
  </div>`;

  return $instance;
};

$(() => {
  //Ajax post request of todos data
  $('.filter button').on('click', function(event) {
    event.preventDefault();

    $.ajax({
      method: "GET",
      url: "/api/categories"
    }).done((categories) => {
      for (const todo of categories) {
        const todoInstance = createTodoInstance(todo);

        $(".todos_container").append(todoInstance);
        // $("<div class=\"to-do-instance\">").text(todo).appendTo($(".todos_container"));
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
  });

  $('.to-do-instance').on('click', function(event) {
    event.preventDefault();
    alert('test');
  });

});
