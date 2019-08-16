import axios from 'axios'

const baseURL = "/api/persons"

const getAll = () => axios.get(baseURL).then(response => response.data)

const addPerson = (person) => axios.post(baseURL, person).then(response => response.data)

const deletePerson = (id) => axios.delete(`${baseURL}/${id}`).then(response => response.data)

const editPerson = (person, id) => axios.put(`${baseURL}/${id}`, person).then(response => response.data)

export default { getAll, addPerson, deletePerson, editPerson }