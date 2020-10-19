const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));

  return div.innerHTML;
};

// Creates all todo instances in specfic category
const createTodoInstance = function(todo) {
  const title = escape(todo.title);
  const $instance = `
  <div class="to-do-instance">
    <header>
      <p>${title}</p>
      <span>
        <button class="btn btn-outline-secondary" data-todo_id="${todo.id}" data-categort_id="${todo.categoryID}">Edit</button>
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
        <p>
        <label for="submit"></label>
        <button class="btn btn-outline-success">Submit!</button>
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
    let todoID = ($(todo).data('todo_id')).toString();

    $(`#${todoID}`).toggle('fast', function() {
    });
  });


//Ajax get request for submitting edit
  $('body').on('click', '.btn-outline-success', function(event) {
    event.preventDefault();
    console.log(event);
    const newTitle = event.target.form[0].value;
    const newDescription = event.target.form[1].value;
    const isCompleted = event.target.form[2].checked;
    const todoID = event.target.form.id;
    $.ajax({
      method: "GET",
      url: `/api/todos/${todoID}`,
      data: {
        title: newTitle,
        description: newDescription,
        complete: isCompleted,
        id: todoID
      }
    }).done((todos) => {
      $(".todos_container").empty();
      for (const todo of todos) {
        const todoInstance = createTodoInstance(todo);
        $(".todos_container").append(todoInstance);
      }
    });

  });

//Ajax get request for delete instance



});

