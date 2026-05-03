import type { TodosTopProps } from "@/types/todos";
import React, { useState, type SubmitEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import DeleteAll from "./DeleteAll";
import TodosType from "./TodosType";
import { toast } from "sonner";

const TodosTop = ({
  handleAddTodo,
  handleDeleteAll,
}: TodosTopProps): React.JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("Todo");
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleAddTodo(inputValue, selectedType);
      toast.success("Todo has been created");
      setInputValue("");
      setSelectedType("Todo");
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
      <form onSubmit={handleSubmit} className="flex-1">
        <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/80 p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-ring/40 sm:flex-row sm:items-center">
          <Input
            className="border-0 bg-transparent px-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
          />
          <div className="flex items-center gap-2 sm:border-l sm:border-border/60 sm:pl-1.5">
            <TodosType
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <Button
              type="submit"
              variant="default"
              className="gap-1.5 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </form>
      <DeleteAll handleDeleteAll={handleDeleteAll} />
    </div>
  );
};

export default TodosTop;
