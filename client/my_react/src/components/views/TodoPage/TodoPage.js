import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import TodoList from './Sections/TodoList'
import TodoHeader from './Sections/TodoHeader.js'
import TodoForm from './Sections/TodoForm'
import useFetch from './Sections/UseFetch'

export const TodoContext = React.createContext();

function TodoPage() {

    const [Todos, setTodos] = useState([]);
    const [NewTodo, setNewTodo] = useState('');
    
    const Loading = false;
    /*useFetch(setTodos, 'http://localhost:8080/todo')*/;

    const changeInputData = (event) => {
        setNewTodo(event.target.value);
    }

    const addTodo = (event) => {
        event.preventDefault();
        setTodos([...Todos, {title:NewTodo,id:Todos.length,status:'todo'}]);
        document.getElementById("todo-input").value = "";
    }

    const changeTodoStatus = (id) => {
        const updateTodos = Todos.map(todo => {
            console.log(typeof todo.id + "/" + typeof id);

            if(todo.id === Number(id)){
                if(todo.status === "done"){
                    todo.status = "todo"
                } else {
                    todo.status = "done"
                }
            }
            return todo;
        })

        setTodos(updateTodos);
    }

    useEffect(() => {
        console.log("새로운 내용이 렌더링되었네요", Todos);
    }, [Todos])

    return (
            <NavBar content={
                <TodoContext.Provider value={{
                        Todos, 
                        Loading, 
                        addTodo, 
                        changeInputData, 
                        changeTodoStatus
                    }}>
                    <TodoHeader />
                    <TodoForm />
                    <TodoList />
                </TodoContext.Provider>
            }></NavBar>
    )
}

export default TodoPage;
