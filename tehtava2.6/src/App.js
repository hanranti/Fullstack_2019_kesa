import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
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
          {persons.map(person => (<li key={person.name}>{person.name} {person.phoneNumber}</li>))}
        </ul>
      </div>
    </div>
  )

}

export default App