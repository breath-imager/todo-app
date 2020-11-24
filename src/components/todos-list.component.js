import React, {Component, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Todo = props => (
    <tr>
        <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoDescription}</td>
        <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoResponsible}</td>
        <td className={props.todo.todoCompleted ? 'completed' : ''}>{props.todo.todoPriority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>

    </tr>
)

export default function TodosList () {
    const [todos, setTodos] = React.useState([])

   
    const todoList = () => {
        return todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />
        })
    }
    // use axios.get method to access the /todos endpoint
    useEffect(() => {
        const init = async () => {
            await axios.get('http://localhost:4000/todos/')
                .then(response => {
                    // assign response.data to the todos propertty of the component's state object
                    
                    setTodos(response.data)
                })
                .catch(function (error){
                    alert('here')
                    console.log(error)
                })
        }
        init()
    })

    return (
        <div>
            <h3>Todos List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { todoList() }
                </tbody>
            </table>
        </div>
    )
}