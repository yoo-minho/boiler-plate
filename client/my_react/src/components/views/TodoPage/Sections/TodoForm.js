import React, {useContext} from 'react'
import { TodoContext } from '../TodoPage'

function TodoForm() {

    const {addTodo, changeInputData} = useContext(TodoContext);

    return (
        <form action="">
            <input id="todo-input" type="text" name="" onChange={changeInputData}></input>
            <button onClick={addTodo}>할일추가</button>
        </form>
    )
}

export default TodoForm
