import React, { useState, useEffect } from "react";
import Name from "./components/Name";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [updated, setUpdated] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setUpdated(response.data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    //for-loop käy läpi nameobjectin nimet ja numerot
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName && persons[i].number === newNumber) {
        window.alert(`${newName} is already added to phonebook`);
        //pop-metodi estää nimen lisäyksen
        persons.pop();
        updated.pop();
      }
    }
    setPersons(persons.concat(nameObject));
    setUpdated(persons.concat(nameObject));
    //console.log(persons);
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setUpdated(persons);
    } else {
      const filtered = persons.filter((name) => {
        return name.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setUpdated(filtered);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {updated.map((name) => (
          <Name key={name.id} name={name} number={name.number} />
        ))}
      </ul>
    </div>
  );
};

export default App;
