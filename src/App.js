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
      //use contacService to update the number
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmUpdate) {
        const personObject = {
          name: newName,
          number: number,
        };
        contactsService
          .update(nameExists.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== nameExists.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              console.log(`Contact with ID ${nameExists.id} not found`);
            } else {
              console.log("Error updating contact:", error);
            }
          });
      }
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
  const deletePerson = (id) => {
    contactsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log(`Contact with ID ${id} not found`);
        } else {
          console.log("Error deleting contact:", error);
        }
      });
  };

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
      <ContactsDisplay
        filteredPersons={filteredPersons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
