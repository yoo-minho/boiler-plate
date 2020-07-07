import React, {useContext} from 'react'
import TodoItem from './Sections/TodoItem'
import { TodoContext } from '../../Stores/TodoStore.js'

import './TodoList.css'

function TodoList() {

    const {Todos, dispatch} = useContext(TodoContext);

    const setInitData = (initData) => {
        dispatch({type:'SET_INTT_DATA', payload:initData})
    }

    const Loading = false;
    /*useFetch(setInitData, 'http://localhost:8080/todo')*/;

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