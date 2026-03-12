import { useState } from 'react'
import TodoFilter from './TodoFilter'
import type { Todo} from "@/types"
import TodosBoard from './TodosBoard'
import TodosTop from './TodosTop'


const TodosList = (): React.JSX.Element =>{

    const [todos, setTodos] = useState<Todo[]>([])
    const [activeFilters, setActiveFilters] = useState<string[]>([])

    const handleAddTodo = (text: string, status: string): void => {
        const newTodo: Todo = {
            id: Date.now(),
            text: text,
            createdAt: new Date().toLocaleDateString("en-UK"),
            status: status
        }
        setTodos((prev): Todo[] => [...prev, newTodo]);
    }
    const handleDeleteTodo = (id: number): void => {
        setTodos((prev): Todo[] => prev.filter((todo) => todo.id !== id))
    }
    const handleDeleteAll = (): void => {
        setTodos([])
    }
    const handleToggleFilter = (status: string): void => {
        setActiveFilters((prev) => 
            prev.includes(status) 
                ? prev.filter((filterVal) => filterVal !== status) 
                : [...prev, status]
        )
    }
    const filteredTodos = todos.filter((todo) => 
        activeFilters.length === 0 || activeFilters.includes(todo.status)
    )

    return <div>
        <TodosTop handleAddTodo={handleAddTodo} handleDeleteAll={handleDeleteAll} />
        <TodoFilter activeFilters={activeFilters} handleToggleFilter={handleToggleFilter} 
            />
        <TodosBoard todos={filteredTodos} handleDelete={handleDeleteTodo} />
    </div>
}

export default TodosList