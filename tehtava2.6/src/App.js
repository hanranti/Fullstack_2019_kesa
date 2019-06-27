import React, { useState, useEffect } from 'react'

import Numbers from './components/Numbers'
import Filter from './components/Filter';
import AddOrEditPersonForm from './components/AddOrEditPersonForm';
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(persons.concat(response))
    }).catch(error => alert("Something went wrong!"))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationClass, setNotificationClass] = useState('')

  const addOrEditPerson = (event) => {
    event.preventDefault()
    const editedPerson = persons.filter(person => person.name === newName)[0]

    switch (editedPerson) {
      case undefined:
        personService.addPerson({ name: newName, number: newNumber }).then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          timedNotification(`Added ${newName}!`, 'success')
        }).catch(error => alert("Something went wrong!"))
        break
      default:
        window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
          ? personService.editPerson({ name: newName, number: newNumber }, editedPerson.id).then(response =>
            setPersons(persons.map(person => person.id !== editedPerson.id ? person : response)))
            .then(response => timedNotification(`Edited number of ${newName}`, 'success'))
            .catch(error => {
              personService.getAll().then(response => {
                setPersons(response)
              }).catch(error => alert("Something went wrong!"))
              timedNotification(`Person named ${newName} was removed from server recently!`, 'error')
            })
          : timedNotification(`Cancelled editing ${newName}!`, 'neutral')
        break
    }

    //    persons.some(person => person.name === newName
    //      ? window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
    //        ? personService.editPerson({ name: newName, number: newNumber }, persons.filter(p => p.name === newName)[0].id)
    //        : console.log("Person editing cancelled!")
    //      : personService.addPerson({ name: newName, number: newNumber }).then(response => {
    //        setPersons(persons.concat(response))
    //        setNewName('')
    //        setNewNumber('')
    //      }).catch(error => alert("Something went wrong!"))
    //    )

  }

  const timedNotification = (message, className) => {
    setNotificationMessage(message)
    setNotificationClass(className)
    setTimeout(() => {
      setNotificationMessage('')
      setNotificationClass('')
    }, 10000)
  }

  const deletePerson = ({ deletedPerson }) => {
    window.confirm(`Delete ${deletedPerson.name}`)
      ? personService.deletePerson(deletedPerson.id).then(response =>
        setPersons(persons.filter(person => person.id !== deletedPerson.id)))
        .then(timedNotification(`Deleted ${deletedPerson.name}!`, 'success')).catch(error =>
          timedNotification("That person was already deleted!", 'error'))
      : timedNotification(`Cancelled deleting ${deletePerson.name}!`, 'neutral')
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
      {notificationMessage !== '' ? <Notification notificationMessage={notificationMessage} className={notificationClass} /> : <div></div>}
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