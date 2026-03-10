import type { Todo, TodosBoardProps } from "@/types"
import React, {useState} from "react"
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Plus } from 'lucide-react'
import { ButtonGroup } from "@/components/ui/button-group"
import { Field } from "@/components/ui/field"
import DeleteAll from "./DeleteAll"
import TodosType from "./TodosTypes"

const TodosTop = ({todos, setTodos}:TodosBoardProps):React.JSX.Element => {
    const [inputValue, setInputValue] = useState<string>("")
    const [selectedType, setSelectedType] = useState<string>("")
    const handleAdd = () =>{
        const newTodo:Todo = {
        id: Date.now(),
        text: inputValue,
        createdAt: new Date().toLocaleDateString("en-UK"),
        totype: selectedType
        }

    setTodos([...todos, newTodo])

    setInputValue("")

    
    }

    return (<div className="flex flex-row">
        <Field >
            <ButtonGroup >
            <Input className="border-1 border-black rounded-full" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Write ToDos here..."/>
            <TodosType selectedType={selectedType} setSelectedType={setSelectedType}/>
            <Button className="flex-initial border-1 border-black rounded-full" onClick={handleAdd} variant="default"><Plus />Add</Button></ButtonGroup>
        </Field>
        <DeleteAll setTodos={setTodos} todos={todos} />
        </div>)
}

export default TodosTop