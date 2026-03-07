import { useState } from 'react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Plus, Trash } from 'lucide-react'


type Todo = {
  id : number
  text : string
  createdAt : string
}


const TodosList = (): React.JSX.Element =>{

    const [todos, setTodos] = useState<Todo[]>([])
    const [inputValue, setInputValue] = useState<string>("")

    const handleAdd = () =>{
        const newTodo:Todo = {
        id: Date.now(),
        text: inputValue,
        createdAt: new Date().toLocaleDateString("en-UK"),
        }

    setTodos([...todos, newTodo])

    setInputValue("")

    
    }
    const handleDelete = (id:number):void =>{
        setTodos(todos.filter((todo) => todo.id !== id))
    }
    const handleDeleteAll = ():void =>{
        setTodos([])
    }

    return <div>
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Write ToDos here...'/>
        <Button onClick={handleAdd}><Plus />Add</Button>
        <Button onClick={handleDeleteAll}><Trash />Delete All</Button>
        <div>{todos.map((todo:Todo): React.JSX.Element => (
            <div key={todo.id}>
            <div>{todo.text}</div>
            <div>{todo.createdAt}</div>
            <Button onClick={() => handleDelete(todo.id)}><Trash />Delete</Button>
            </div>
        ))
            }
        </div>
        
        
    </div>
}

export default TodosList