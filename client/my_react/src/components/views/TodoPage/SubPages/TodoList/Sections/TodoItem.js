import React, {useContext} from 'react'
import { TodoContext } from '../../../Stores/TodoStore'
import './TodoItem.css'

export default function TodoItem(props) {

    const {dispatch} = useContext(TodoContext);

    const toggleItem = (event) => {
        const id = event.target.dataset.id;
        if(props.todo.status === 'done'){
            event.target.classList.remove('done')
        } else {
            event.target.classList.add('done')
        }
        dispatch({type:'CHANGE_TODO_STATUS', payload:id});
    }

    return (
        <li data-id={props.todo.id} onClick={toggleItem} className='todo-item'>{props.todo.title}</li>
    )
}
