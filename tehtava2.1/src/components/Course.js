import React from 'react'

const Header = ({ course }) => (
    <h1>{course}</h1>
)

const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => (
    <div>
        {parts.map(part => (<Part key={part.id} part={part} />))}
    </div>
)

const Total = ({ course }) => {
    const total = course.parts
        .map(part => (part.exercises))
        .reduce((accumulator, currentValue) => accumulator + currentValue)

    return <p>yhteensä {total} tehtävää</p>
}

const Course = ({ course }) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total course={course} />
    </div>
)

export default Course