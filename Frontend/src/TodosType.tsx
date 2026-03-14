import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { TodosTypeProps } from "./types"


const TodosType = ({selectedType, setSelectedType}:TodosTypeProps):React.JSX.Element => {



    return (
    <Select value={selectedType} onValueChange={setSelectedType}>
  <SelectTrigger className="w-[145px] border-1 border-black rounded-xs">
    <SelectValue placeholder="Todo Type" className="rounded-xs"/>
  </SelectTrigger>
  <SelectContent className="rounded-xs">
    <SelectGroup className="rounded-xs">
      <SelectItem value="Todo" className="rounded-xs">Todo</SelectItem>
      <SelectItem value="In progress" className="rounded-xs">In Progress</SelectItem>
      <SelectItem value="Done" className="rounded-xs">Done</SelectItem>
      <SelectItem value="Canceled" className="rounded-xs">Canceled</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
  )

}
export default TodosType