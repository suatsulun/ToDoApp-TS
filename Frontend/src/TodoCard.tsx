import type { TodoCardProps } from "@/types";
import { Input } from "./components/ui/input";
import TodosType from "./TodosType";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./components/ui/button";
import { Trash, Edit, X, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TodoCard = ({
  todo,
  handleDelete,
  updateTodo,
}: TodoCardProps): React.JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editStatus, setEditStatus] = useState(todo.status);

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
      <Card className="w-fit">
        {isEditing ? (
          <>
            <CardHeader>
              <CardTitle className="w-max">
                <Input
                  className="boder-1 border-black rounded-full"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </CardTitle>
              <CardDescription>
                <span>Created at:</span>
                <br />
                {new Date(todo.created_at).toLocaleDateString("en-GB")}
              </CardDescription>
              <CardDescription>
                <TodosType
                  selectedType={editStatus}
                  setSelectedType={setEditStatus}
                />
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full rounded-full" onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button
                className="border-1 border-red-600 rounded-full w-full"
                onClick={() => setIsEditing(false)}
                variant="outline"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="w-max">{todo.text}</CardTitle>
              <CardDescription>
                <span>Created at:</span>
                <br />
                {new Date(todo.created_at).toLocaleDateString("en-GB")}
              </CardDescription>
              <CardDescription>{todo.status}</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-2">
              <Button
                className="w-full rounded-full"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                className="border-1 border-red-600 rounded-full w-full"
                onClick={() => handleDelete(todo.id)}
                variant="destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};
export default TodoCard;
