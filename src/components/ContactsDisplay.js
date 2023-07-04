import React from "react";

const ContactsDisplay = ({ filteredPersons }) => {
  return (
    <div className="contacts-container">
      {filteredPersons.map((person) => (
        <div key={person.name} className="contact-box">
          <p className="contact-name">{person.name}</p>
          <p className="contact-number">{person.number}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactsDisplay;
