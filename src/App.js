import { useState, useEffect } from "react";
import Search from "./components/Search";
import ContactsDisplay from "./components/ContactsDisplay";
import PersonForm from "./components/PersonForm";
import axios from "axios";
import contactsService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  //use effect to fetch data from server to initialize contacts
  useEffect(() => {
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   setPersons(response.data);
    // });
    contactsService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

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
    contactsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
    // setPersons([...persons, personObject]);
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
      <Search handleSearch={handleSearch} search={search} />

      <h2>Add New</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        newName={newName}
        number={number}
      />

      <h2>Contacts</h2>
      <ContactsDisplay filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
