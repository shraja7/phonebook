//setup express server
const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
//static files
app.get("/api/persons", (req, res) => {
  res.send(persons);
});

//routes

//listen to port
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
