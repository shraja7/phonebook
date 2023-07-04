import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");

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
    setPersons(persons.concat(personObject));
    //clear input
    setNewName(" ");
    setNumber(" ");
  };

  const handleNameInput = (event) => {
    setNewName(event.target.value);
    //clear input field only on the page
  };

  const handleNumberInput = (event) => {
    setNumber(event.target.value);
  };

  return (
    <div className="container">
      <h2>Phonebook</h2>
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
        <div className="contact-column">
          {persons.map((person) => (
            <p key={person.name}>{person.name}</p>
          ))}
        </div>
        <div className="contact-column">
          {persons.map((person) => (
            <p key={person.name}>{person.number}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
