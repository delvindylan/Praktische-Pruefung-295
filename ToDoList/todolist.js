const express = require("express");
const app = express();
const session = require("express-session");
const port = 3000;
/*const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')


app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "supersecret",
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

let isLoggedIn = false;

app.post("/login", (req, res) => {
  const email = req.body.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //ChatGPT
  const password = "m295";

  if (email !== "" && emailRegex.test(email) && req.body.password == password) {
    req.session.email = email;
    res.status(200).send("You are logged in");
    isLoggedIn = true;
  } else {
    res.status(401).send("Invalid email or password");
  }
});

app.get("/tasks", (req, res) => {
  /*
 #swagger.tags = ["tasks"]
 #swagger.summary = 'Get all tasks'
 #swagger.description = 'Get the html navbar to navigate the site'
 #swagger.responses[200] = {description: "html loaded"}}
 #swagger.responses[404] = {description: "html not found"}
*/
  if (isLoggedIn == true) {
    res.status(200).contentType("application/json").json(tasks);
  } else {
    res.status(403).send("not logged in");
  }
});

app.post("/tasks", (req, res) => {
  if (isLoggedIn == true) {
    const newCompletionDate = req.body.completionDate;

    const newTask = {
      id: tasks.length + 1,
      title: req.body.title,
      creationDate: new Date().toLocaleDateString(),
      completionDate: newCompletionDate || null,
    };

    if (req.body.title == "") {
      res.sendStatus(406);
    } else {
      tasks.push(newTask);
      res.status(201).contentType("application/json").send(newTask);
    }
  } else {
    res.status(403).send("not logged in");
  }
});

app.get("/tasks/:id", (req, res) => {
  if (isLoggedIn == true) {
    const id = req.params.id;
    const specificTask = tasks.find((specificTask) => specificTask.id == id);
    if (!specificTask) {
      res.sendStatus(404);
    } else {
      res.status(200).contentType("application/json").json(specificTask);
    }
  } else {
    res.status(403).send("not logged in");
  }
});

app.put("/tasks/:id", (req, res) => {
  if (isLoggedIn == true) {
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
    if (req.body.title == "") {
      res.sendStatus(406);
    } else {
      tasks.splice(tasks.indexOf(specificTask), 1, tasks[specificTask]);
      res.status(200).contentType("application/json").json(tasks[specificTask]);
    }
  } else {
    res.status(403).send("not logged in");
  }
});

app.delete("/tasks/:id", (req, res) => {
  if (isLoggedIn == true) {
    const id = req.params.id;
    const specificTask = tasks.find((specificTask) => specificTask.id == id);
    if (!specificTask) {
      res.sendStatus(404);
    } else {
      tasks.splice(tasks.indexOf(specificTask), 1);
      res.status(200).contentType("application/json").json(specificTask);
    }
  } else {
    res.status(403).send("not logged in");
  }
});

app.get("/verify", (req, res) => {
  if (!req.session.email) {
    res.status(401).send("not verified");
  } else {
    res.status(200).send("verified");
  }
});

app.delete("/logout", (req, res) => {
  req.session.destroy();
  res.sendStatus(204);
});


app.get("/:xyz", (req, res) => {
  const xyz = req.params.xyz;
  res.sendStatus(404)
})

app.post("/:xyz", (req, res) => {
  const xyz = req.params.xyz;
  res.sendStatus(404)
})

app.put("/:xyz", (req, res) => {
  const xyz = req.params.xyz;
  res.sendStatus(404)
})

app.patch("/:xyz", (req, res) => {
  const xyz = req.params.xyz;
  res.sendStatus(404)
})

app.delete("/:xyz", (req, res) => {
  const xyz = req.params.xyz;
  res.sendStatus(404)
})

app.listen(port, () => {
  console.log(`Example App listening on port ${port}`);
});
