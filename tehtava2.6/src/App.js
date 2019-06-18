import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Numbers from './components/Numbers'
import Filter from './components/Filter';
import AddPersonForm from './components/AddPersonForm';

const App = () => {

  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(persons.concat(response.data))
    })
  }, [])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    const addOrAlert = (persons.some(person => person.name === newName)
      ? () => alert(`${newName} is already added to phonebook`)
      : () => {
        setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
        setNewName('')
        setNewNumber('')
      }
    )

    addOrAlert()
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