import { useState } from 'react'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Plus, Trash } from 'lucide-react'
import { ButtonGroup } from "@/components/ui/button-group"
import { Field } from "@/components/ui/field"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


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
        <div className="flex flex-row">
        <Field >
            <ButtonGroup >
            <Input className="border-1 border-black rounded-full" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Write ToDos here..."/>
            <Button className="flex-initial border-1 border-black rounded-full" onClick={handleAdd} variant="default"><Plus />Add</Button></ButtonGroup>
        </Field>
        <Button className="flex-initial border-1 border-red-600 rounded-full ml-2" variant="destructive" onClick={handleDeleteAll}><Trash />Delete All</Button></div>
        <div className="flex flex-wrap gap-2 w-full">{todos.map((todo:Todo): React.JSX.Element => (
            <div key={todo.id} className="inline-block">
                <Card className="w-fit">
                <CardHeader>
                    <CardTitle className='w-max'>{todo.text}</CardTitle>
                    <CardDescription><span>Created at:</span><br />{todo.createdAt}</CardDescription>
                </CardHeader>
                <CardFooter className="flex-column">
                    <Button className="border-1 border-red-600 rounded-full ml-2 w-full" onClick={() => handleDelete(todo.id)} variant="destructive">
                        <Trash />Delete
                    </Button>
                </CardFooter>
            </Card>
            </div>
        ))
            }
        </div>
    </div>
}

export default TodosList