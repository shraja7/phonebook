import React from "react";

const ContactsDisplay = ({ filteredPersons, deletePerson }) => {
  return (
    <div className="contacts-container">
      {filteredPersons.map((person) => (
        <div key={person.name} className="contact-box">
          <p className="contact-name">{person.name}</p>
          <p className="contact-number">{person.number}</p>
          <button onClick={() => deletePerson(person.id)}> Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ContactsDisplay;
