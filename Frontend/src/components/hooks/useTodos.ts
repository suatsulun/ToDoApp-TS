import { API_BASE_URL } from "@/config"
import { useEffect, useState } from "react"
import type { Todo } from "@/types"
import { toast } from "sonner"


export const useTodos = () =>{
    const [todos, setTodos] = useState<Todo[]>([])
    const [activeFilters, setActiveFilters] = useState<string[]>([])
    const[sortOrder, setSortOrder] = useState<`asc`|`desc`>(`desc`)
    const toggleSortOrder = ():void => {
        setSortOrder((prev)=> prev === `desc` ? `asc`:`desc`)
    }
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
                toast.success("Todo has been deleted", {
  style: {
    color: 'red',
  },
});
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
                toast.success("All Todos has been deleted", {
  style: {
    color: 'red',
  },
});
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
    const filteredTodos = todos
    .filter((todo) => 
        activeFilters.length === 0 || activeFilters.includes(todo.status))
    .sort((a, b) => {
        const timeA= new Date(a.createdAt).getTime()
        const timeB= new Date(b.createdAt).getTime()
        return sortOrder === `asc` ? timeA - timeB : timeB - timeA
    })

    const updateTodo = async (id: number, text: string, status:string): Promise<void> => {
        try{
            const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({text:text, status:status})
            })
            if(response.ok) {
                const data= await response.json()
                setTodos((prev): Todo[] => 
                    prev.map((todo) => todo.id === id ? data:todo)
            )
            } else {
                console.error("Server responded with an error")
            }
        } catch (error) {
            console.error("Could not connect to the backend:", error)
        }
        
    }

    return {
        todos: filteredTodos,
        activeFilters,
        sortOrder,
        toggleSortOrder,
        handleAddTodo,
        handleDeleteTodo,
        handleDeleteAll,
        handleToggleFilter,
        updateTodo,
    }
    }