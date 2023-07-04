import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    //new person object
    const personObject = {
      name: newName,
    };
    //set persons state
    setPersons(persons.concat(personObject));
    //clear input
    setNewName(" ");
  };

  const handleInputChange = (event) => {
    setNewName(event.target.value);
    //clear input field only on the page
  };

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <form className="form-container" onSubmit={addPerson}>
        <div className="input-field">
          Name:{" "}
          <input type="text" onChange={handleInputChange} value={newName} />
        </div>
        <div>
          <button className="button" type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Contacts</h2>
      {
        persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        )) // key is used to identify each item in the list
      }
    </div>
  );
};

export default App;
