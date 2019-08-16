import React from 'react'

const DeletePersonButton = ({ deletePerson, person }) => (
    <button onClick={() => deletePerson({ deletedPerson: person })}>delete</button>
)

const Number = ({ deletePerson, person }) => (
    <li>{person.name} {person.number} <DeletePersonButton deletePerson={deletePerson} person={person} /></li>
)

const Numbers = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            <div>
                <ul>
                    {props.persons.filter(person => person.name.toUpperCase().includes(props.filterName.toUpperCase())
                    ).map(person => (<Number deletePerson={props.deletePerson} key={person.id} person={person} />))}
                </ul>
            </div>
        </div>
    )
}
export default Numbers