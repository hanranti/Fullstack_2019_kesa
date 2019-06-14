import React, { useState } from 'react'

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
      filter shown with:
      <input
        value={filterName}
        onChange={handleFilterNameChange}
      />
      <form onSubmit={addPerson}>
        <h2>add a new</h2>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          phonenumber:
          <input
            value={newPhoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.filter(person => person.name.toUpperCase().includes(filterName.toUpperCase())
          ).map(person => (<li key={person.name}>{person.name} {person.phoneNumber}</li>))}
        </ul>
      </div>
    </div>
  )

}

export default App