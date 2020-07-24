import React, {useContext} from 'react'
import TodoItem from './Sections/TodoItem'
import { TodoContext } from '../../Stores/TodoStore.js'
import useFetch from '../../Actions/UseFetch'

import './TodoList.css'

function TodoList() {

    const {Todos, dispatch} = useContext(TodoContext);

    const setInitData = (initData) => {
        dispatch({type:'SET_INIT_DATA', payload:initData})
    }

    console.log('aaaa36666');
    console.log(Todos);

    const Loading = /*false*/useFetch(setInitData);

    console.log('aaaa7777');
    console.log(Todos);

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