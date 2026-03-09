import { useState } from 'react'


import type { Todo} from "@/types"
import TodosBoard from './TodosBoard'
import TodosTop from './TodosTop'


const TodosList = (): React.JSX.Element =>{

    const [todos, setTodos] = useState<Todo[]>([])


    return <div>
        <TodosTop todos={todos} setTodos={setTodos} />
        <TodosBoard todos={todos} setTodos={setTodos} />
    </div>
}

export default TodosList