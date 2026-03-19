import type { TodosTopProps } from "@/types/todos";
import React, { useState, type SubmitEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
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
    <div className="flex flex-row items-center gap-4">
      <form onSubmit={handleSubmit} className="w-full">
        <Field>
          <ButtonGroup>
            <Input
              className="border-1 border-black rounded-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Write ToDos here..."
            />
            <TodosType
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <Button
              className="flex w-[90px] border-1 border-black rounded-full content-start justify-start"
              type="submit"
              variant="default"
            >
              <Plus />
              Add
            </Button>
          </ButtonGroup>
        </Field>
      </form>
      <DeleteAll handleDeleteAll={handleDeleteAll} />
    </div>
  );
};

export default TodosTop;
