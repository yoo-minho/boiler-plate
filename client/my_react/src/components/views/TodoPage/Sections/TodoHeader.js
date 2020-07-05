import React, { useContext } from 'react'
import './TodoHeader.css'
import { TodoContext } from '../TodoPage'

function TodoHeader() {

    const {Todos} = useContext(TodoContext);

    return (
        <>
            <h1>투두애플리케이션 2</h1>
            <div className="countInfo">
                해야할일 : {Todos.filter(v=>v.status==="todo").length}개가 있습니다.
            </div>
        </>
    )
}

export default TodoHeader