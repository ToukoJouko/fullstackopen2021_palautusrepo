import React, { useState, useEffect } from "react";
import Name from "./components/Name";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [updated, setUpdated] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
      setUpdated(response);
    });
  }, []);

  const updateNumber = (id, newNumber) => {
    const person = persons.find((p) => p.id === id);
    const changedNumber = { ...person, number: newNumber };

    personService
      .update(id, changedNumber)
      .then((response) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : response))
        );
        setUpdated(
          persons.map((person) => (person.id !== id ? person : response))
        );
        setNotification(`Updated ${newName}`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(
          `Information of ${newName} has already been removed from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    setNameList(persons.map((name) => name.name));
    const sameName = nameList.find((n) => n === newName);
    //console.log(nameList);

    if (nameList.includes(newName)) {
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`
      );
      updateNumber(nameList.indexOf(sameName) + 1, newNumber);
    } else {
      personService.create(nameObject).then((response) => {
        setPersons(persons.concat(response));
        setUpdated(persons.concat(response));
        setNewName("");
        setNewNumber("");
        setNotification(`Added ${newName}`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
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

  const deleteFunction = (id, name) => {
    window.confirm(`Delete ${name}?`);
    personService.delete_person(id).then((response) => {
      personService.getAll().then((response) => {
        setPersons(response);
        setUpdated(response);
      });
      setNotification(`Deleted ${name}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />
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
        {updated.map((name, index) => (
          <div key={index}>
            <Name key={index} name={name} number={name.number} />
            <button onClick={() => deleteFunction(index + 1, name.name)}>
              delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
