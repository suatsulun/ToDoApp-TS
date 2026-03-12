import { useState, useEffect } from 'react'
import TodosList from './TodosList'
import './App.css'



const App = ():React.JSX.Element => {

  const [userName, setUserName] = useState<string | null>(null)
  useEffect(() =>{
    const fetchUser = async () =>{
      try {
        const response = await fetch("http://127.0.0.1:8000/me")
        if (response.ok) {
          const data = await response.json()
          setUserName(data.name)
        }else{
          console.error("Server responded with an error")
        }
      } catch (error){
        console.error("Could not connect to the backend:", error)
      }
    }
    fetchUser()
  }, [])

  return(<div className="p-8 max-w-5xl mx-auto flex flex-col gap-6">
      
      
      {userName ? (
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {userName}!
        </h1>
      ) : (
        <h1 className="text-3xl font-bold text-gray-400">
          Loading user...
        </h1>
      )}
    <TodosList />
    </div>
  )
}

export default App
