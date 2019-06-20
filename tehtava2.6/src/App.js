import React, { useState, useEffect } from 'react'

import Numbers from './components/Numbers'
import Filter from './components/Filter';
import AddPersonForm from './components/AddPersonForm';

import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService.getAll().then(response => {
      setPersons(persons.concat(response))
    }).catch(error => alert("Something went wrong!"))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    (persons.some(person => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : personsService.addPerson({ name: newName, number: newNumber }).then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      }).catch(error => alert("Something went wrong"))
    )

    event.preventDefault()
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />
      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <Numbers persons={persons} filterName={filterName} />
    </div>
  )

}

export default App