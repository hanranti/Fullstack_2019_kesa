import React from 'react'

const AddOrEditPersonForm = (props) => (
    <form onSubmit={props.addOrEditPerson}>
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
                value={props.newNumber}
                onChange={props.handleNumberChange}
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default AddOrEditPersonForm