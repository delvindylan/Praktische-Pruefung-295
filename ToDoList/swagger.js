const swaggerAutogen = require("swagger-autogen");
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./todolist.js"];
const config = {info: {
  title: "ToDo List",
  description: "API for ToDo List",
},
host: `localhost:3000`,
securityDefinitions: {
  api_key: {
    type: "apiKey",
    name: "api-key",
    in: "header",
  },
},
schemes: ["http"],
definitions: {
  "server side error": {
    $status: "ERROR",
    $msg: "some error message",
    error: {
      $message: "Error message caught",
      $name: "Error name",
      stack: "Error stack",
    },
  },
  "tasks":{
    $id: 1,
    $title: "Einkauf erledigen",
    $creationDate: "2023-06-14",
    $completionDate: "2023-06-14"
  }
},}
swaggerAutogen(outputFile, endpointsFiles, config).then(async () => {
  await import('./todolist.js'); // Your express api project's root file where the server starts
});