import React, {Component, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function CreateTodo () {
    const [todoDescription, setTodoDescription] = React.useState('')
    const [todoResponsible, setTodoResponsible] = React.useState('')
    const [todoPriority, setTodoPriority] = React.useState('')
    const [todoCompleted, setTodoCompleted] = React.useState(false)

    let history  = useHistory()

    const onChangeTodoDescription = event => {
        console.log(event)
        setTodoDescription(event.target.value)
    }
    
    const onChangeTodoResponsible = event => {
        setTodoResponsible(event.target.value)
    }

    
    const onChangeTodoPriority = event => {
        setTodoPriority(event.target.value)
    }

    const onSubmit = event => {
        event.preventDefault();
        console.log('Form submitted:');
        console.log(`Todo Description: ${todoDescription}`);
        console.log(`Todo Responsible: ${todoResponsible}`);
        console.log(`Todo Priority: ${todoPriority}`);
        
        const newTodo = {
            todoDescription : todoDescription,
            todoResponsible :todoResponsible,
            todoPriority : todoPriority,
            todoCompleted : todoCompleted,
            todoDate : new Date()
        }

        // send an HTTP POST request to the back-end endpoint
        // this endpoint is expecting to get the new todo object in JSON format in the request body
        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data))

        setTodoDescription('')
        setTodoResponsible('')
        setTodoPriority('')
        setTodoCompleted(false)

        history.push('/')
    
        
    }

    


    return (
        <div style={{marginTop: 10}}>
            <h3>Create New Todo</h3>
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
                            type = "text"
                            className="form-control"
                            value={todoResponsible}
                            onChange={onChangeTodoResponsible}
                            />
        

                </div>
                <div className = "form-group">
                    <div className = "form-check form-check-inline">
                        <input  className = "form-check-input"
                                type = "radio"
                                name="priorityOptions"
                                id="prioritLow"
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
                <div className="form-group">
                    <input type="submit" value="Create Todo" className="btn btn-primary" />
                </div>
            </form>

        </div>
    )
}