import React, { useEffect, useReducer } from 'react'
import {TodoReducer} from '../Reducers/TodoReducer'

export const TodoContext = React.createContext();

function TodoStore(props) {

    const [Todos, dispatch] = useReducer(TodoReducer, []);

    useEffect(() => {
        console.log("새로운 내용이 렌더링되었네요", Todos);
    }, [Todos])

    return (
        <TodoContext.Provider value={{Todos, dispatch}}>
            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoStore;
