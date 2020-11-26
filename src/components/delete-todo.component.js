import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

export default function DeleteTodo () {
 

    let params  = useParams()
    let history  = useHistory()
    // send an HTTP POST request to the back-end endpoint
    // this endpoint is expecting to get the new todo object in JSON format in the request body
    axios.post('http://localhost:4000/todos/delete/'+params.id)
        .then(res => console.log(res.data))
    history.push('/')
    
        


    return (

        <div></div>
      
    )
}