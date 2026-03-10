import type{TodoCardProps} from "@/types"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./components/ui/button"
import { Trash } from "lucide-react"


const TodoCard = ({todo, handleDelete}:TodoCardProps):React.JSX.Element => {

    return(<div className="inline-block">
                <Card className="w-fit">
                <CardHeader>
                    <CardTitle className='w-max'>{todo.text}</CardTitle>
                    <CardDescription><span>Created at:</span><br />{todo.createdAt}</CardDescription>
                    <CardDescription>{todo.totype}</CardDescription>
                </CardHeader>
                <CardFooter className="flex-column">
                    <Button className="border-1 border-red-600 rounded-full ml-2 w-full" onClick={()=> handleDelete(todo.id)} variant="destructive">
                        <Trash />Delete
                    </Button>
                </CardFooter>
            </Card>
            </div>)
}
export default TodoCard