import type { TodoCardProps } from "@/types/todos";
import { Input } from "../ui/input";
import TodosType from "./TodosType";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Trash, Edit, X, Check, CalendarDays, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { cn } from "@/lib/utils";
import { statusAccentClass, statusBadgeClass, statusDotClass } from "@/lib/status";

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

  const formattedDate = new Date(todo.created_at).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      className={cn(
        "group relative flex h-[300px] w-full flex-col justify-between overflow-hidden rounded-2xl border-border/60 bg-card/90 p-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/10",
      )}
    >
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-1.5",
          statusAccentClass(isEditing ? editStatus : todo.status),
        )}
        aria-hidden
      />

      {isEditing ? (
        <>
          <div className="flex flex-col items-center gap-3 px-5 pt-6">
            <Input
              className="rounded-xl text-center"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />

            <div className="flex w-full flex-col gap-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserRound className="h-3 w-3" />
                <span>{todo.owner.username}</span>
              </div>
            </div>

            <div className="w-full">
              <TodosType
                selectedType={editStatus}
                setSelectedType={setEditStatus}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 px-5 pb-5">
            <Button className="w-full" onClick={handleSave} size="sm">
              <Check className="mr-1 h-4 w-4" />
              Save
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-3 px-5 pt-6">
            <span
              className={cn(
                "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
                statusBadgeClass(todo.status),
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  statusDotClass(todo.status),
                )}
              />
              {todo.status}
            </span>

            <h3
              className="line-clamp-4 min-h-[4.5rem] break-words text-base font-semibold leading-snug text-foreground"
              title={todo.text}
            >
              {todo.text}
            </h3>

            <div className="flex flex-col gap-1.5 border-t border-border/50 pt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="h-3 w-3" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserRound className="h-3 w-3" />
                <span>{todo.owner.username}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 px-5 pb-5">
            <Button
              className="flex-1"
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="outline"
              disabled={!isOwner}
            >
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </Button>
            <Button
              className="flex-1"
              onClick={() => handleDelete(todo.id)}
              variant="destructive"
              size="sm"
              disabled={!isOwner}
            >
              <Trash className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};
export default TodoCard;
