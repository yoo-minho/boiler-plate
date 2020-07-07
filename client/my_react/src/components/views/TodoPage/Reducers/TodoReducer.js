export const TodoReducer = (Todos, {type, payload}) => {
    switch (type) {
        case "ADD_TODO":
            return [...Todos, {title: payload ,id:Todos.length, status:'todo'}];

        case "CHANGE_TODO_STATUS":
            return Todos.map(todo => {
                if(todo.id === Number(payload)){
                    if(todo.status === "done"){
                        todo.status = "todo"
                    } else {
                        todo.status = "done"
                    }
                }
                return todo;
            })
    
        case "SET_INIT_DATA":
            return payload;
    
        default:
            break;
    }
}