# Tidy Task

### Contributors: [Aleksandar Dmitrovic](https://github.com/AleksandarDmitrovic) and [Jason Vongsana](https://github.com/jvongsana)

Tidy task is an auto categorizing to-do list organizational web application. This is a full-stack web application built as the Lighthouse Labs Web Development Bootcamp Midterm Project

## Final Product

#### Homepage

!["Registration & Homepage"](https://github.com/AleksandarDmitrovic/tidyTask/blob/master/docs/register&homepage.gif?raw=true)

#### Make, Edit, Delete A Todo

!["Make, Edit, Delete Todo"](https://github.com/AleksandarDmitrovic/tidyTask/blob/master/docs/make&delete%20_todo.gif?raw=true)

#### Auto Categorizing Book

!["Auto Categorizing Book"](https://github.com/AleksandarDmitrovic/tidyTask/blob/master/docs/book-todo.gif?raw=true)

#### Auto Categorizing Product

!["Auto Categorizing Product"](https://github.com/AleksandarDmitrovic/tidyTask/blob/master/docs/product-todo.gif?raw=true)

#### Auto Categorizing Restaurant

!["Auto Categorizing Restaurant"](https://github.com/AleksandarDmitrovic/tidyTask/blob/master/docs/restaurant-todo.gif?raw=true)

## Stack

### Back-End
- Node.js
- Express
- PostgreSQL

### Front-End
- HTML
- SCSS

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies: `npm i`
3. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env` Setup pg database.
4. Update the .env file with your correct local information 
5. Sign up at https://dandelion.eu/ to get the Dandelion API token. Enter your token in the .env file. To create the test classification model run the command  `curl -i --data-urlencode "data@model.json" -d "token=<YOUR_TOKEN>"   http://api.dandelion.eu/datatxt/cl/models/v1`(Docs: https://dandelion.eu/docs/api/datatxt/cl/models/v1/). Copy the model id number into the .env file.

6. Reset database: `npm run db:reset`
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node
- PG
- express

