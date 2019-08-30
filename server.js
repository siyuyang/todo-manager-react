"use strict";
const express = require("express");
const app = require("express")();
const cors = require("cors");
const fs = require("file-system");
const bodyParser = require("body-parser");
const tasks = fs.readFileSync("./tasks.json");
const todoListData = JSON.parse(tasks);
const uuid = require("uuidv4");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

let baseUrl = "http://localhost";

/**
 * GET /tasks
 *
 * Return the list of tasks with status code 200.
 */
app.get(`/tasks`, (req, res) => {
  const tasks = fs.readFileSync("./tasks.json");
  let lists = JSON.parse(tasks);
  return res.status(200).json({ lists });
});

/**
 * PUT /task/update/:id/:title/:description
 *
 * id: Number
 * title: string
 * description: string
 *
 * Update the task with the given id.
 * If the task is found and update as well, return a status code 204.
 * If the task is not found, return a status code 404.
 * If the provided id is not a valid number return a status code 400.
 */
app.put("/task/update", (req, res) => {
  const { data, listName } = req.body;

  const cardArr = todoListData[listName].cards;

  todoListData[listName].cards = cardArr.map(card => {
    if (card.id === data.id) {
      return data;
    }
    return card;
  });

  let todDdata = JSON.stringify(todoListData);
  fs.writeFileSync("./tasks.json", todDdata);
  return res.status(201).json({
    message: "Resource created"
  });
});

/**
 * POST /task/create/:title/:description
 *
 * title: string
 * description: string
 *
 * Add a new task to the array todoListData.tasks with the given title and description.
 * Return status code 201.
 */
app.post("/task/create", (req, res) => {
  const { listName, data } = req.body;
  const id = uuid();

  const task = {
    id,
    ...data
  };

  todoListData[listName].cards.push(task);

  let dbData = JSON.stringify(todoListData);
  fs.writeFileSync("./tasks.json", dbData);

  return res.status(201).json({
    data: { ...task },
    message: "Resource created"
  });
});

/**
 * DELETE /task/delete/:id
 *
 * id: Number
 *
 * Delete the task linked to the  given id.
 * If the task is found and deleted as well, return a status code 204.
 * If the task is not found, return a status code 404.
 * If the provided id is not a valid number return a status code 400.
 */
app.delete("/task/delete/:listName/:cardId", (req, res) => {
  const { listName, cardId } = req.params;

  todoListData[listName].cards = todoListData[listName].cards.filter(
    card => card.id !== cardId
  );

  let dbData = JSON.stringify(todoListData);
  fs.writeFileSync("./tasks.json", dbData);
  return res.status(200).json({
    message: "Updated successfully"
  });
});

// update Lists

app.post("/task/updateLists", (req, res) => {
  const { lists } = req.body;
s
  let data = JSON.stringify(lists);
  fs.writeFileSync("./tasks.json", data);

  return res.status(201).json({
    message: "Resource created"
  });
});

if (process.env.NODE_ENV === "production") {
  baseUrl = "https://todo-manager-react.herokuapp.com/";
  app.use(express.static("client/build"));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
}
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  process.stdout.write(`the server is available on ${baseUrl}:${PORT}/\n`);
});
