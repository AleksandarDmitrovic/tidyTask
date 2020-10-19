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
        <button class="btn btn-outline-secondary" data-todo_id="${todo.id}">Edit</button>
        <button class="btn btn-outline-danger" >Delete</button>
      </span>
    </header>
    <div >
      <form class="edit-form" id="${todo.id}">
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

const onClick = function(id) {
  const todoForm = document.getElementById(id);
  if (todoForm.style.display === "none") {
    todoForm.style.display = "block";
  } else {
    todoForm.style.display = "none";
  }
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

    $(".todos_container").empty();

    $.ajax({
      method: "GET",
      url: `/api/categories/${categoryID}`
    }).done((todos) => {
      for (const todo of todos) {
        const todoInstance = createTodoInstance(todo);
        $(".todos_container").append(todoInstance);
      }
    });
  });


  //Ajax get request for editing instance form
  $('body').on('click', '.btn-outline-secondary', function(event) {
    event.preventDefault();

    let todo = event.target;
    // console.log('todo: ', todo);
    let todoID = ($(todo).data('todo_id')).toString();
    // console.log('todoID :', todoID);

  });


//Ajax get request for submitting edit






































//Ajax get request for delete instance
$('body').on('click', '.btn-outline-danger', function(event) {
// console.log('event :', event);
  event.preventDefault();

  let todo = event.target.previousElementSibling;
  // console.log('todo: ', todo);
  let todoID = ($(todo).data('todo_id')).toString();
  // console.log('todoID :', todoID);

  // let categoryID = ($(todo).data('category_id')).toString();
  // console.log('categoryID :', categoryID);

  $.ajax({
    url: `/api/todos/${todoID}`
  }).done((categoryID) => {
    if(categoryID === null) {
      categoryID = 'Uncategorized';
    }
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
    $(".todos_container").empty();

  });

});


});
