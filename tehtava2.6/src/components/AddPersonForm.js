import React from 'react'

const AddPersonForm = (props) => (
    <form onSubmit={props.addPerson}>
        <h2>add a new</h2>
        <div>
            name:
          <input
                value={props.newName}
                onChange={props.handleNameChange}
            />
        </div>
        <div>
            phonenumber:
          <input
                value={props.newPhoneNumber}
                onChange={props.handlePhoneNumberChange}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default AddPersonForm