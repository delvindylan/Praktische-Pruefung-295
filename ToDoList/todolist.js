const express = require("express");
const app = express();
const session = require("express-session");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "supersecret", //Signatur für Cookie
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

//generierte Daten von ChatGPT
const tasks = [
  {
    id: 1,
    title: "Einkauf erledigen",
    creationDate: new Date().toLocaleDateString(),
    completionDate: null,
  },
  {
    id: 2,
    title: "Geburtstagskarte schreiben",
    creationDate: new Date().toLocaleDateString(),
    completionDate: new Date("2023-06-15").toLocaleDateString(),
  },
  {
    id: 3,
    title: "Sport treiben",
    creationDate: new Date().toLocaleDateString(),
    completionDate: new Date("2023-06-14").toLocaleDateString(),
  },
  {
    id: 4,
    title: "Reise planen",
    creationDate: new Date().toLocaleDateString(),
    completionDate: null,
  },
  {
    id: 5,
    title: "Buch lesen",
    creationDate: new Date().toLocaleDateString(),
    completionDate: new Date("2023-06-20").toLocaleDateString(),
  },
];

app.get("/tasks", (req, res) => {
  res.status(200).contentType("application/json").json(tasks);
});

app.post("/tasks", (req, res) => {
  //const newTask = req.body;

  const newCompletionDate = req.body.completionDate;

  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    creationDate: new Date().toLocaleDateString(),
    completionDate: newCompletionDate || null,
  };

  tasks.push(newTask);
  res.status(201).contentType("application/json").send(newTask);
});

app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const specificTask = tasks.find((specificTask) => specificTask.id == id);
  if (!specificTask) {
    res.sendStatus(404);
  } else {
    res.status(200).contentType("application/json").json(specificTask);
  }
});

app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const updatedTask = req.body;
  const specificTask = tasks.find((specificTask) => specificTask.id == id);
  if (!specificTask) {
    res.sendStatus(404);
  } else {
    tasks[specificTask] = {
      ...updatedTask,
    };
  }
  tasks.splice(tasks.indexOf(specificTask), 1, tasks[specificTask]);
  res.status(200).contentType("application/json").json(tasks[specificTask]);
});

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const specificTask = tasks.find((specificTask) => specificTask.id == id);
  if (!specificTask) {
    res.sendStatus(404);
  } else {
    tasks.splice(tasks.indexOf(specificTask), 1);
    res.status(200).contentType("application/json").json(specificTask);
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //ChatGPT
  const password = "m295";

  if (email!=="" && emailRegex.test(email) && req.body.password == password) {
    req.session.email = email;
    res.status(200).send("You are logged in");
  } else {
    res.status(401).send("Invalid email or password");
  }
})

app.listen(port, () => {
  console.log(`Example App listening on port ${port}`);
});
