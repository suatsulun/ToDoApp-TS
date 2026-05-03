import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TodosTypeProps } from "../../types/todos";
import { cn } from "@/lib/utils";
import { statusDotClass } from "@/lib/status";

const STATUS_OPTIONS = ["Todo", "In progress", "Done", "Canceled"];

const TodosType = ({
  selectedType,
  setSelectedType,
}: TodosTypeProps): React.JSX.Element => {
  return (
    <Select value={selectedType} onValueChange={setSelectedType}>
      <SelectTrigger className="w-[140px] rounded-xl">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        <SelectGroup>
          {STATUS_OPTIONS.map((status) => (
            <SelectItem key={status} value={status} className="rounded-lg">
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    statusDotClass(status),
                  )}
                />
                {status}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default TodosType;
