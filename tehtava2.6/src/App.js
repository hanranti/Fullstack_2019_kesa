import React, { useState } from 'react'

import Numbers from './components/Numbers'
import Filter from './components/Filter';
import AddPersonForm from './components/AddPersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addPerson = (event) => {
    const addOrAlert = (persons.some(person => person.name === newName)
      ? () => alert(`${newName} is already added to phonebook`)
      : () => {
        setPersons(persons.concat({ name: newName, phoneNumber: newPhoneNumber }))
        setNewName('')
        setNewPhoneNumber('')
      }
    )

    addOrAlert()
    event.preventDefault()
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
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
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange} />
      <Numbers persons={persons} filterName={filterName} />
    </div>
  )

}

export default App