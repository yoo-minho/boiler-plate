import React, {useContext, useRef} from 'react'
import { TodoContext } from '../../Stores/TodoStore.js'

function TodoForm() {

    const inputRef = useRef(false);
    const {dispatch} = useContext(TodoContext);

    const addTodoData = (e)=> {
        e.preventDefault();
        dispatch({type:'ADD_TODO', payload : inputRef.current.value});
        document.getElementById("todo-input").value = "";
    }

    return (
        <form action="">
            <input id="todo-input" type="text" ref={inputRef}></input>
            <button onClick={addTodoData}>할일추가</button>
        </form>
    )
}

export default TodoForm
