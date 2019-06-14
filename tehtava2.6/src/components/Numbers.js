import React from 'react'

const Number = ({ person }) => (
    <li>{person.name} {person.phoneNumber}</li>
)

const Numbers = (props) => (
    <div>
        <h2>Numbers</h2>
        <div>
            <ul>
                {props.persons.filter(person => person.name.toUpperCase().includes(props.filterName.toUpperCase())
                ).map(person => (<Number key={person.name} person={person} />))}
            </ul>
        </div>
    </div>
)
export default Numbers