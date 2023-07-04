import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    //check if name already exists in the phonebook
    const nameExists = persons.find(
      (p) => p.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    //new person object
    const personObject = {
      name: newName,
      number: number,
    };
    //set persons state
    // Update the persons state
    setPersons([...persons, personObject]);
    //clear input
    setNewName("");
    setNumber("");
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
    //clear input field only on the page
  };

  const handleNumberInput = (event) => {
    setNumber(event.target.value);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const filteredPersons = persons.filter((person) => {
    const searchInput = search.toLowerCase();
    return (
      person.name.toLowerCase().includes(searchInput) ||
      person.number.includes(searchInput)
    );
  });
  return (
    <div className="container">
      <h2>Phonebook</h2>
      <div className="search-container">
        <div className="input-field">
          Search:
          <input
            type="text"
            onChange={handleSearch}
            value={search}
            className="search-field"
          />
        </div>
      </div>

      <h2>Add New</h2>

      <form className="form-container" onSubmit={addPerson}>
        <div className="input-field">
          Name: <input type="text" onChange={handleNameInput} value={newName} />
        </div>
        <div className="number-field">
          Number:{" "}
          <input
            type="text"
            onChange={handleNumberInput}
            value={number}
            className="number-field"
          />
        </div>
        <div>
          <button className="button" type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Contacts</h2>
      <div className="contacts-container">
        {filteredPersons.map((person) => (
          <div key={person.name} className="contact-box">
            <p className="contact-name">{person.name}</p>
            <p className="contact-number">{person.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
