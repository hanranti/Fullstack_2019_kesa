import React, { useState, useEffect } from 'react'

import Numbers from './components/Numbers'
import Filter from './components/Filter';
import AddOrEditPersonForm from './components/AddOrEditPersonForm';
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationClass, setNotificationClass] = useState('')
  const success = 'success'
  const neutral = 'neutral'
  const error = 'error'

  useEffect(() => {
    personService.getAll().then(response => {
      console.log(response)
      setPersons(persons.concat(response))
    }).catch(err => {
      timedNotification("Something went wrong!", error)
      console.log(err)
    })
  }, [])

  const addOrEditPerson = (event) => {
    event.preventDefault()
    const editedPerson = persons.filter(person => person.name === newName)[0]

    switch (editedPerson) {
      case undefined:
        addPerson(newName, newNumber)
        break
      default:
        editPerson(newName, newNumber, editedPerson)
        break
    }
  }

  const addPerson = (name, number) =>
    personService.addPerson({ name: name, number: number }).then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
      timedNotification(`Added ${name}!`, success)
    }).catch(err => timedNotification("Something went wrong!", error))

  const editPerson = (name, number, editedPerson) =>
    window.confirm(`${name} is already added to the phonebook, replace the old number with a new one?`)
      ? personService.editPerson({ name: name, number: number }, editedPerson.id).then(response =>
        setPersons(persons.map(person => person.id !== editedPerson.id ? person : response)))
        .then(response => timedNotification(`Edited number of ${name}`, success))
        .catch(error => {
          personService.getAll().then(response => {
            setPersons(response)
          }).catch(err => timedNotification("Something went wrong!", error))
          timedNotification(`Person named ${name} was removed from server recently!`, error)
        })
      : timedNotification(`Cancelled editing ${name}!`, neutral)

  const deletePerson = ({ deletedPerson }) => {
    window.confirm(`Delete ${deletedPerson.name}`)
      ? personService.deletePerson(deletedPerson.id).then(response =>
        setPersons(persons.filter(person => person.id !== deletedPerson.id)))
        .then(timedNotification(`Deleted ${deletedPerson.name}!`, success)).catch(err =>
          timedNotification("That person was already deleted!", error))
      : timedNotification(`Cancelled deleting ${deletedPerson.name}!`, neutral)
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

  const timedNotification = (message, className) => {
    setNotificationMessage(message)
    setNotificationClass(className)
    setTimeout(() => {
      setNotificationMessage('')
      setNotificationClass('')
    }, 10000)
  }

  return (
    <div>
      {notificationMessage !== ''
        ? <Notification notificationMessage={notificationMessage} className={notificationClass} />
        : <div></div>}
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />
      <AddOrEditPersonForm
        addOrEditPerson={addOrEditPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <Numbers persons={persons} filterName={filterName} deletePerson={deletePerson} />
    </div>
  )

}

export default App