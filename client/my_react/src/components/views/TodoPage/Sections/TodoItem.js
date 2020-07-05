import React, {useContext} from 'react'
import './TodoItem.css'
import { TodoContext } from '../TodoPage'

export default function TodoItem(props) {

    const {changeTodoStatus} = useContext(TodoContext);

    const toggleItem = (event) => {
        const id = event.target.dataset.id;
        if(props.todo.status === 'done'){
            event.target.classList.remove('done')
        } else {
            event.target.classList.add('done')
        }
        changeTodoStatus(id);
    }

    return (
        <li data-id={props.todo.id} onClick={toggleItem} className='todo-item'>{props.todo.title}</li>
    )
}
