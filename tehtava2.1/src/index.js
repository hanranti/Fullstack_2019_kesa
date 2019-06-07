import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Course = ({course}) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total course={course} />
    </div>
)

const Total = ({course}) => {
  console.log(course.parts.map(part => (part.exercises)))
  const total = course.parts
    .map(part => (part.exercises))
    .reduce((accumulator, currentValue) => accumulator + currentValue)

  return <p>yhteensä {total} tehtävää</p>
}

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (<Part key={part.id} part={part} />))}
  </div>
)

const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'New Part',
          exercises: 1,
          id: 4
        },
        {
          name: 'New Part 2',
          exercises: 13,
          id: 5
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)