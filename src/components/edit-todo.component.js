import React, {Component, useEffect} from 'react'
import axios from 'axios'
import { useHistory,  useParams } from 'react-router-dom'

export default function EditTodo () { 
    const [todoDescription, setTodoDescription] = React.useState('')
    const [todoResponsible, setTodoResponsible] = React.useState('')
    const [todoPriority, setTodoPriority] = React.useState('')
    const [todoCompleted, setTodoCompleted] = React.useState(false)
    let params  = useParams()
    let history  = useHistory()

    const onSubmit = event =>{
        event.preventDefault()

        const updatedTodo = {
            todoDescription : todoDescription,
            todoResponsible :todoResponsible,
            todoPriority : todoPriority,
            todoCompleted : todoCompleted
        }

        console.log(updatedTodo)
       
        axios.post('http://localhost:4000/todos/update/'+ params.id, updatedTodo)
            .then(res => console.log(res.data))
        history.push('/')

    }
    const onChangeTodoDescription = e => {
        console.log (e)
        setTodoDescription (e.target.value)
    }

    const onChangeTodoResponsible = e => {
        setTodoResponsible (e.target.value)
    }

    const onChangeTodoPriority = e => {
        setTodoPriority(e.target.value)
    }

    const onChangeTodoCompleted = e => {
        setTodoCompleted(!todoCompleted )
    }
    useEffect(() => {
        const init = async () => {
            // restrieve todo item by sending an HTTP GET request to the back-end
            // the id comes from the URL parameter
            await axios.get('http://localhost:4000/todos/'+params.id)
                .then(response => {
                    // set state values with specific todo item
                    setTodoDescription(response.data.todoDescription)
                    setTodoResponsible(response.data.todoResponsible)
                    setTodoCompleted(response.data.todoCompleted)
                    setTodoPriority(response.data.todoPriority)
                })
                .catch(function (error){
                    console.log(error)
                })
        }
        init()
    }, [])

    return (
        <div>
            <h3 align="center">Update Todo</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={todoDescription}
                                onChange={onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={todoResponsible}
                                onChange={onChangeTodoResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={todoPriority==='Low'} 
                                    onChange={onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={todoPriority==='Medium'} 
                                    onChange={onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={todoPriority==='High'} 
                                    onChange={onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={onChangeTodoCompleted}
                                checked={todoCompleted}
                                value={todoCompleted}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form> 
        </div>
    )
}