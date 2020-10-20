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
          <label for="change-category">Category: </label>
          <select id="categories" name="categories">
          <option value="" selected disabled hidden>Choose here</option>
            <option value="1">Movies/Series</option>
            <option value="2">Restaurants</option>
            <option value="3">Books</option>
            <option value="4">Products</option>
            <option value="null">Uncategorized</option>
          </select>
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

const getCategoryName = function(id) {
  let category = "";
  console.log(id);
  switch (id) {
  case '1':
    category += "Movies / Series";
    break;
  case '2':
    category += "Restaurants";
    break;
  case '3':
    category += "Books";
    break;
  case '4':
    category += "Products";
    break;
  case 'Uncategorized' || null:
    category += "Uncategorized";
  }

  return `<h2>${category}</h2>`;
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

    const category = event.target.parentElement;
    const categoryID = ($(category).data('filter')).toString();

    $(".todos_container").empty();

    $.ajax({
      method: "GET",
      url: `/api/categories/${categoryID}`
    }).done((todos) => {
      $(".todos_container").append(getCategoryName(categoryID));
      console.log(categoryID);
      for (const todo of todos) {
        const todoInstance = createTodoInstance(todo);
        $(".todos_container").append(todoInstance);
      }
    });
  });


  //Ajax get request for editing instance form
  $('body').on('click', '.btn-outline-secondary', function(event) {
    event.preventDefault();

    const todo = event.target;
    const todoID = ($(todo).data('todo_id')).toString();

    $(`#${todoID}`).toggle('fast', function() {
    });
  });


//Ajax get request for submitting edit
  $('body').on('click', '.btn-outline-success', function(event) {
    event.preventDefault();
    console.log(event);
    const newTitle = event.target.form[0].value;
    const newDescription = event.target.form[1].value;
    const newCategory = event.target.form[2].value;
    const isCompleted = event.target.form[3].checked;
    const todoID = event.target.form.id;

    $.ajax({
      method: "GET",
      url: `/api/editTodo/${todoID}`,
      data: {
        title: newTitle,
        description: newDescription,
        category_id: newCategory,
        complete: isCompleted,
        id: todoID
      }
    }).done((categoryID) => {
      if (categoryID === null) {
        categoryID = 'Uncategorized';
      }
      console.log(categoryID);
      $.ajax({
        method: "GET",
        url: `/api/categories/${categoryID}`
      }).done((todos) => {
        $(".todos_container").empty();
        $(".todos_container").append(getCategoryName(categoryID.toString()));
        for (const todo of todos) {
          const todoInstance = createTodoInstance(todo);
          $(".todos_container").append(todoInstance);
        }
      });
    });
  });


//Ajax get request for delete instance
  $('body').on('click', '.btn-outline-danger', function(event) {
    event.preventDefault();

    const todo = event.target.previousElementSibling;
    const todoID = ($(todo).data('todo_id')).toString();

    $.ajax({
      url: `/api/deleteTodo/${todoID}`
    }).done((categoryID) => {
      if(categoryID === null) {
        categoryID = 'Uncategorized';
      }
      $.ajax({
        method: "GET",
        url: `/api/categories/${categoryID}`
      }).done((todos) => {
        $(".todos_container").empty();
        $(".todos_container").append(getCategoryName(categoryID.toString()));
        for (const todo of todos) {
          const todoInstance = createTodoInstance(todo);
          $(".todos_container").append(todoInstance);
        }
      });
    });
  });
});
