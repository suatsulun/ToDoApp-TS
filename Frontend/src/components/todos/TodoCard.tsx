import type { TodoCardProps } from "@/types/todos";
import { Input } from "../ui/input";
import TodosType from "./TodosType";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Trash, Edit, X, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";

const TodoCard = ({
  todo,
  handleDelete,
  updateTodo,
}: TodoCardProps): React.JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editStatus, setEditStatus] = useState(todo.status);
  const { user } = useAuth();
  const isOwner = user?.id === todo.owner_id;

  const handleSave = () => {
    updateTodo(todo.id, editText, editStatus);
    toast.success("Todo has been updated");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(todo.text);
      setEditStatus(todo.status);
    }
  };


  return (
    <div className="inline-block">
      <Card className="w-[240px] h-[300px] flex flex-col justify-between text-center overflow-hidden">
        {isEditing ? (
          <>
            <CardHeader className="flex flex-col items-center w-full px-4 pt-4 pb-2">
              <CardTitle className="w-full border-b border-gray-200 pb-3 mb-2 flex justify-center">
                <Input
                  className="border-1 border-black rounded-full text-center"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </CardTitle>
              <CardDescription className="space-y-1 text-xs">
                <div>
                  <span className="font-semibold">Created at: </span>
                  {new Date(todo.created_at).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div>
                  <span className="font-semibold">By: </span>
                  {todo.owner.username}
                </div>
              </CardDescription>
              <div className="mt-2 w-full flex justify-center">
                <TodosType
                  selectedType={editStatus}
                  setSelectedType={setEditStatus}
                />
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col gap-2 px-4 pb-4">
              <Button
                className="w-full rounded-full"
                onClick={handleSave}
                size="sm"
              >
                <Check className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button
                className="border-1 border-red-600 text-red-600 rounded-full w-full hover:bg-red-50"
                onClick={() => setIsEditing(false)}
                variant="outline"
                size="sm"
              >
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="flex flex-col items-center w-full px-4 pt-1 pb-2">
              <CardTitle
                className="w-full line-clamp-4 break-words whitespace-normal border-b border-gray-100 pb-3 mb-2 min-h-[3rem] h-[4.5rem]"
                title={todo.text}
              >
                {todo.text}
              </CardTitle>

              <CardDescription className="space-y-1 text-xs">
                <div>
                  <span className="font-semibold">Created at: </span>
                  {new Date(todo.created_at).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div>
                  <span className="font-semibold">By: </span>
                  {todo.owner.username}
                </div>
              </CardDescription>
              <CardDescription className="mt-2 font-medium text-gray-700">
                {todo.status}
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-col gap-2 px-4 pb-4">
              <Button
                className="w-full rounded-full"
                onClick={() => setIsEditing(true)}
                size="sm"
                disabled={!isOwner}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                className="border-1 border-red-600 rounded-full w-full"
                onClick={() => handleDelete(todo.id)}
                variant="destructive"
                size="sm"
                disabled={!isOwner}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};
export default TodoCard;
