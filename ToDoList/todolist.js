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



app.listen(port, () => {
  console.log(`Example App listening on port ${port}`);
});
