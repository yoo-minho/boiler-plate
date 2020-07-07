import React from 'react'
import NavBar from '../NavBar/NavBar'
import TodoStore from './Stores/TodoStore.js'
import TodoList from './SubPages/TodoList/TodoList.js'
import TodoHeader from './SubPages/TodoHeader/TodoHeader.js'
import TodoForm from './SubPages/TodoForm/TodoForm.js'

function TodoPage() {
    return (
            <NavBar content={
                <TodoStore>
                    <TodoHeader />
                    <TodoForm />
                    <TodoList />
                </TodoStore>
            }></NavBar>
    )
}

export default TodoPage;
