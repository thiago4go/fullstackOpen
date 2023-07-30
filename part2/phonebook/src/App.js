import { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phoneService from "./services/phone";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [someMessage, setSomeMessage] = useState(null);

  useEffect(() => {
    phoneService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };

    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one: ${newNumber}?`
        )
      ) {
        const person = persons.find((p) => p.name === newName);
        const changedPerson = { ...person, number: newNumber };

        phoneService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id === person.id ? returnedPerson : p))
            );
          })
          .catch((error) => {
            setSomeMessage(
              `Information of ${person.name} has already been removed from server`
            );
            setPersons(persons.filter((p) => p.id !== person.id));
            setTimeout(() => {
              setSomeMessage(null);
            }, 3000);
          });
        setSomeMessage(`Changed ${newName}'s number`);
        setTimeout(() => {
          setSomeMessage(null);
        }, 3000);
        setNewNumber("");
        setNewName("");
        return;
      } else {
        setNewNumber("");
        setNewName("");
        return;
      }
    }
    phoneService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setSomeMessage(`Added ${newName}`);
      setTimeout(() => {
        setSomeMessage(null);
      }, 3000);
      setNewNumber("");
      setNewName("");
    });
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneService
        .deleteEntry(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setSomeMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setSomeMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setSomeMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setPersons(persons.filter((p) => p.id !== id));
          setTimeout(() => {
            setSomeMessage(null);
          }, 3000);
        });
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    if (message.includes("Added")) {
      return <div className="notification added">{message}</div>;
    }
    if (message.includes("Changed")) {
      return <div className="notification changed">{message}</div>;
    }
    if (message.includes("Deleted")) {
      return <div className="notification deleted">{message}</div>;
    }
    if (message.includes("server")) {
      return <div className="notification error">{message}</div>;
    }
    return null;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={someMessage} />
      <Filter
        value={filter}
        onChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        onNameChange={handlePersonChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          deletePerson={() => deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
