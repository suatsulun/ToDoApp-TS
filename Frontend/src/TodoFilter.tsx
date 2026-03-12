import type { TodoFilterProps } from "@/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label" 

const TodoFilter = ({ activeFilters, handleToggleFilter }: TodoFilterProps): React.JSX.Element => {
    
    const availableStatuses = ["Todo", "In progress", "Done", "Canceled"]

    return (
        <div className="flex flex-row gap-4 my-4 items-center p-4 border-1 border-gray-200 rounded-lg">
            <span className="font-semibold text-sm">Filter by Status:</span>
            {availableStatuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                    <Checkbox 
                        id={`filter-${status}`} 
                        checked={activeFilters.includes(status)}
                        onCheckedChange={() => handleToggleFilter(status)}
                    />
                    <Label htmlFor={`filter-${status}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {status}
                    </Label>
                </div>
            ))}
            {activeFilters.length > 0 && (
                <span className="text-xs text-gray-500 italic ml-auto">
                    Showing selected statuses
                </span>
            )}
        </div>
    )
}

export default TodoFilter