import React, {useContext} from 'react'
import TodoItem from './TodoItem'
import './TodoList.css'
import { TodoContext } from '../TodoPage'

function TodoList() {

    const {Todos, Loading, changeTodoStatus} = useContext(TodoContext);

    let todoList = <div>로딩중...</div>
    if(!Loading) todoList = Todos.map( todo => 
        <TodoItem key={todo.id} todo={todo}/>
    )
    return (
        <ul className="todo-list">
           {todoList}
        </ul>
    )
}

export default TodoList