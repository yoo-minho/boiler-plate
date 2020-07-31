import React, {useContext} from 'react'
import { TodoContext } from '../../../Stores/TodoStore'
import axios from 'axios'
import './TodoItem.css'

export default function (props) {

    const {dispatch} = useContext(TodoContext);

    const todoItemClassName = 'todo-item ' + (props.todo.todo_status === 'Y' ? 'done' : '');

    const toggleItem = (event) => {
        const id = event.target.dataset.id;
        console.log(id);
        console.log(props.todo.todo_status);
        if(props.todo.todo_status === 'Y'){
            event.target.classList.remove('done')
        } else {
            event.target.classList.add('done')
        }
        dispatch({type:'CHANGE_TODO_STATUS', payload:id});

        const variables = {
            todoSrno:id
        }

        axios.post('/api/todo/changeTodoStatus',variables)
        .then(response => {
            //console.log(response.data.res.rows)
        })

    }

    return (
        <li 
            data-id={props.todo.todo_srno} 
            onClick={toggleItem} 
            className={todoItemClassName}>
                {props.todo.todo_contents}
        </li>
    )
}

