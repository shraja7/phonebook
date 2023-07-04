import React from "react";

const PersonForm = ({
  addPerson,
  handleNameInput,
  handleNumberInput,
  newName,
  number,
}) => {
  return (
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
  );
};

export default PersonForm;
