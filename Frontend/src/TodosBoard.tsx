import type { TodosBoardProps, Todo } from "@/types"
import TodoCard from "./TodoCard"


const TodosBoard = ({todos, handleDelete}:TodosBoardProps):React.JSX.Element => {
    

    return (<div className="flex flex-wrap gap-2 w-full">{todos.map((todo:Todo): React.JSX.Element => (
        <TodoCard key={todo.id} todo={todo} handleDelete={handleDelete} />
        ))
            }
        </div>)
}
export default TodosBoard