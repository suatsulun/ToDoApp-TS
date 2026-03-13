import { API_BASE_URL } from "@/config"
import { useEffect, useState } from "react"
import type { Todo } from "@/types"


export const useTodos = () =>{
    const [todos, setTodos] = useState<Todo[]>([])
    const [activeFilters, setActiveFilters] = useState<string[]>([])
    useEffect(() => {
    const fetchTodos = async () =>{
        try{
            const response = await fetch (`${API_BASE_URL}/api/todos`)
        if (response.ok) {
            const data = await response.json()
            setTodos(data)
        } else{
            console.error("Server responded with an error")
        }
    } catch (error){
        console.error("Could not connect to the backend:", error)
    }
}
    fetchTodos()
}, [])

    const handleAddTodo = async (text: string, status: string): Promise<void> => {
        try{
            const response = await fetch(`${API_BASE_URL}/api/todos`, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({text:text, status:status})
            })
            if(response.ok) {
                const data= await response.json()
                setTodos((prev): Todo[] => [...prev, data])
            } else {
                console.error("Server responded with an error")
            }
        } catch (error) {
            console.error("Could not connect to the backend:", error)
        }
    }
    const handleDeleteTodo = async (id: number): Promise<void> => {
        try{
            const response = await fetch (`${API_BASE_URL}/api/todos/${id}`, {
                method: "DELETE",
            })
            if(response.ok) {
                setTodos((prev): Todo[] => prev.filter((todo) => todo.id !== id))
            }else{
                console.error("Server responded with an error")
            }} catch (error) {
                console.error("Could not connect to the backend:", error)
            }
        }
    const handleDeleteAll = async (): Promise<void> => {
        try{
            const response = await fetch (`${API_BASE_URL}/api/todos`, {
                method: "DELETE",
            })
            if(response.ok) {
                setTodos([])
            }else{
                console.error("Server responded with an error")
            }} catch (error) {
                console.error("Could not connect to the backend:", error)
            }
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

    return {
        todos: filteredTodos,
        activeFilters,
        handleAddTodo,
        handleDeleteTodo,
        handleDeleteAll,
        handleToggleFilter,
    }
    }