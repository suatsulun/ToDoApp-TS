import type { TodosBoardProps} from "@/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./components/ui/button"
import { Trash } from "lucide-react"

const DeleteAll = ({setTodos}:TodosBoardProps):React.JSX.Element =>{

    
    const handleDeleteAll = ():void =>{
        setTodos([]);
    }

    return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex-initial border-1 border-red-600 rounded-full ml-2" variant="destructive"><Trash />Delete All</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete all your
            ToDos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="flex-initial border-1 border-red-600 rounded-full ml-2" variant="destructive" onClick={handleDeleteAll}>Delete All</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default DeleteAll