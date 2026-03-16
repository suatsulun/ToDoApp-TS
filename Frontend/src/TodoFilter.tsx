import type { TodoFilterProps } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FILTER_STATUSES } from "./config";
import { Button } from "./components/ui/button";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const TodoFilter = ({
  activeFilters,
  handleToggleFilter,
  toggleSortOrder,
  sortOrder,
}: TodoFilterProps): React.JSX.Element => {
  return (
    <div className="flex flex-row gap-4 my-4 items-center p-4 border-1 border-gray-200 rounded-lg">
      <span className="font-semibold text-sm">Filter by Status:</span>
      {FILTER_STATUSES.map((status) => (
        <div key={status} className="flex items-center space-x-2">
          <Checkbox
            id={`filter-${status}`}
            checked={activeFilters.includes(status)}
            onCheckedChange={() => handleToggleFilter(status)}
          />
          <Label
            htmlFor={`filter-${status}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {status}
          </Label>
        </div>
      ))}
      <div className="ml-auto">
        {activeFilters.length > 0 && (
          <span className="text-xs text-gray-500 italic mr-2">
            Showing selected statuses
          </span>
        )}
        {sortOrder === `desc` ? (
          <Button size="icon" aria-label="Submit" onClick={toggleSortOrder}>
            <ArrowUpIcon />
          </Button>
        ) : (
          <Button size="icon" aria-label="Submit" onClick={toggleSortOrder}>
            <ArrowDownIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TodoFilter;
