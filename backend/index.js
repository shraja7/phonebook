//setup express server
const Person = require("./models/person");

const express = require("express");
const app = express();
const cors = require("cors");

//implement morgan
const morgan = require("morgan");
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

//middleware
// app.use(
//   cors({
//     origin: "https://phonebook-req4.onrender.com",
//     optionsSuccessStatus: 200,
//   })
// );

const corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static("build"));

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
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.status(200).json(persons);
    })
    .catch((error) => next(error));
});

//info page
app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`);
});

//route to get a single contact using Person model with error handling
app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).json({ message: "Contact not found" });
      }
    })
    .catch((error) => {
      // console.log(error);
      // res.status(500).json({ message: "Internal server error" });
      next(error);
    });
});

//route to delete a contact using Person model with error handling
//route to delete a contact using Person model with error handling
app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      if (result) {
        res.status(204).send("Deleted successfully");
      } else {
        res.status(404).send("Contact not found");
      }
    })
    .catch((error) => {
      // console.log(error);
      // res.status(500).send("Internal Server Error");
      next(error);
    });
});

//route to add a contact using Person model with error handling

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((error) => next(error));
});

//route for updating a contact using Person model with error handling
// route for updating a contact using Person model with error handling
// route for updating a contact using Person model with error handling
app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const updatedPerson = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(id, updatedPerson, { new: true })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: "Contact not found" });
      }
    })
    .catch((error) => {
      next(error);
    });
});

//error handler middleware
const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return res.status(400).json({ message: "Malformatted ID" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
  //error handler for deleting a contact
  else if (error.name === "TypeError") {
    return res.status(404).json({ message: "Contact not found" });
  }
  //error handler for updating a contact
  else if (error.name === "ReferenceError") {
    return res.status(500).json({ message: "Failed to update the contact" });
  }
  next(error);
};

app.use(errorHandler);

//listen to port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
