const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));

  return div.innerHTML;
};

// Creates all todo instances in specfic category
const createTodoInstance = function(todo) {
  const title = escape(todo.title);
  const $instance = `
  <div class="to-do-instance" instance-filter="${todo.id}">
    <header>
      <p>${title}</p>
      <span>
        <button class="btn btn-outline-secondary" >Edit</button>
        <button class="btn btn-outline-danger" >Delete</button>
      </span>
    </header>
    <div>
      <form class="edit-form">
        <p>
          <label for="title">Title: </label>
          <input type="text" id="title" value="${title}">
        </p>
        <p>
          <label for="description">Description: </label>
          <textarea name="description" id="description" rows="3" cols="50">${todo.description}</textarea>
        </p>
        <p>
          <label for="completed">Completed: </label>
          <input type="checkbox" value="">
        </p>
      </form>
    </div>
  </div>`;

  return $instance;
};

$(() => {
  // New todo form toggle
  $('.new-todo-toggle').click(function() {
    $('.compose-todo').toggle('fast', function() {
    });
  });

  //Ajax get request of todos data
  $('.filter button').on('click', function(event) {
    event.preventDefault();

    let category = event.target.parentElement;
    let categoryID = ($(category).data('filter')).toString();
    // console.log('categoryID :', categoryID);

    //Empty todos container

    $.ajax({
      method: "GET",
      url: `/api/categories/${categoryID}`
    }).done((todos) => {
      $(".todos_container").empty();
      for (const todo of todos) {
        const todoInstance = createTodoInstance(todo);
        $(".todos_container").append(todoInstance);
      }

    });
  });
});
