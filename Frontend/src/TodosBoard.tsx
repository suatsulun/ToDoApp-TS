import type { TodosBoardProps, Todo } from "@/types"
import TodoCard from "./TodoCard"


const TodosBoard = ({todos, setTodos}:TodosBoardProps):React.JSX.Element => {
    const handleDelete = (id:number):void =>{
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    return (<div className="flex flex-wrap gap-2 w-full">{todos.map((todo:Todo): React.JSX.Element => (
        <TodoCard key={todo.id} todo={todo} handleDelete={handleDelete} />
        ))
            }
        </div>)
}
export default TodosBoard