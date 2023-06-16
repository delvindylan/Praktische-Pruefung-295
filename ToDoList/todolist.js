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
    title: "Einkauf erledigen",
    creationDate: new Date(),
    completionDate: null,
  },
  {
    title: "Geburtstagskarte schreiben",
    creationDate: new Date(),
    completionDate: new Date("2023-06-15"),
  },
  {
    title: "Sport treiben",
    creationDate: new Date(),
    completionDate: new Date("2023-06-14"),
  },
  {
    title: "Reise planen",
    creationDate: new Date(),
    completionDate: null
  },
  {
    title: "Buch lesen",
    creationDate: new Date(),
    completionDate: new Date("2023-06-20"),
  },
];

app.listen(port, () => {
  console.log(`Example App listening on port ${port}`);
});
