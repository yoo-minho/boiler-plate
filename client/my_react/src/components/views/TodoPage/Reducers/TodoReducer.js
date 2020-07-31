export const TodoReducer = (Todos, {type, payload}) => {

    switch (type) { 
        case "ADD_TODO":
            return [{todo_contents: payload, id:Todos.length, todo_status:'N'}].concat(Todos);

        case "CHANGE_TODO_STATUS":
            return Todos.map(todo => {
                if(todo.todo_srno === Number(payload)){
                    if(todo.todo_status === "Y"){
                        todo.todo_status = "N"
                    } else {
                        todo.todo_status = "Y"
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