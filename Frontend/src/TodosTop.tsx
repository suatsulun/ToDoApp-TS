import type { TodosTopProps } from "@/types"
import React, {useState} from "react"
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Plus } from 'lucide-react'
import { ButtonGroup } from "@/components/ui/button-group"
import { Field } from "@/components/ui/field"
import DeleteAll from "./DeleteAll"
import TodosType from "./TodosTypes"

const TodosTop = ({ handleAddTodo, handleDeleteAll }: TodosTopProps):React.JSX.Element => {
    const [inputValue, setInputValue] = useState<string>("")
    const [selectedType, setSelectedType] = useState<string>("Todo")
    const onAddClick = () => {
        if (!inputValue.trim()) return;
        handleAddTodo(inputValue, selectedType);
    
        setInputValue("");
        setSelectedType("Todo");
    
    }

    return (<div className="flex flex-row items-center gap-4">
        <Field >
            <ButtonGroup >
            <Input className="border-1 border-black rounded-full" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Write ToDos here..."/>
            <TodosType selectedType={selectedType} setSelectedType={setSelectedType}/>
            <Button className="flex-initial border-1 border-black rounded-full" onClick={onAddClick} variant="default"><Plus />Add</Button></ButtonGroup>
        </Field>
        <DeleteAll handleDeleteAll={handleDeleteAll} />
        </div>)
}

export default TodosTop