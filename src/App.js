import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  return (
    <div className="container">
      <h2>Phonebook</h2>
      <form className="form-container">
        <div className="input-field">
          Name: <input type="text" />
        </div>
        <div>
          <button className="button" type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* ... */}
    </div>
  );
};

export default App;
