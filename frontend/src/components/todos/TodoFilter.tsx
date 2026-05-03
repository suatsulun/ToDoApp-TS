import type { TodoFilterProps } from "@/types/todos";
import { FILTER_STATUSES } from "../../config/constants";
import { Button } from "../ui/button";
import { ArrowDownIcon, ArrowUpIcon, ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusDotClass } from "@/lib/status";

const TodoFilter = ({
  activeFilters,
  handleToggleFilter,
  toggleSortOrder,
  sortOrder,
}: TodoFilterProps): React.JSX.Element => {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border/60 bg-card/70 p-3 shadow-sm">
      <div className="flex items-center gap-2 pl-1 text-sm font-medium text-muted-foreground">
        <ListFilter className="h-4 w-4" />
        Filter:
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {FILTER_STATUSES.map((status) => {
          const active = activeFilters.includes(status);
          return (
            <button
              key={status}
              type="button"
              onClick={() => handleToggleFilter(status)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
                active
                  ? "border-transparent bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-sm shadow-violet-500/20"
                  : "border-border/70 bg-background/60 text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  active ? "bg-white/80" : statusDotClass(status),
                )}
              />
              {status}
            </button>
          );
        })}
      </div>
      <div className="ml-auto flex items-center gap-2">
        {activeFilters.length > 0 && (
          <span className="hidden text-xs italic text-muted-foreground sm:inline">
            Showing selected statuses
          </span>
        )}
        <Button
          size="icon"
          variant="outline"
          aria-label="Toggle sort order"
          onClick={toggleSortOrder}
          title={sortOrder === "desc" ? "Newest first" : "Oldest first"}
        >
          {sortOrder === "desc" ? (
            <ArrowDownIcon className="h-4 w-4" />
          ) : (
            <ArrowUpIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default TodoFilter;
