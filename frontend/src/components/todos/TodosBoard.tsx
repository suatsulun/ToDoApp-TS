import type { TodosBoardProps, Todo } from "@/types/todos";
import TodoCard from "./TodoCard";
import { Inbox } from "lucide-react";

const TodosBoard = ({
  todos,
  handleDelete,
  updateTodo,
}: TodosBoardProps): React.JSX.Element => {
  if (!todos || todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/70 bg-muted/30 px-6 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Inbox className="h-6 w-6" />
        </div>
        <div>
          <p className="font-semibold">No todos to show</p>
          <p className="text-sm text-muted-foreground">
            Add your first todo above to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {todos.map(
        (todo: Todo): React.JSX.Element => (
          <TodoCard
            key={todo.id}
            todo={todo}
            handleDelete={handleDelete}
            updateTodo={updateTodo}
          />
        ),
      )}
    </div>
  );
};
export default TodosBoard;
