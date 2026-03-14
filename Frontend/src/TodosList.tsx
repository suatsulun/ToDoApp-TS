import TodoFilter from './TodoFilter'
import TodosBoard from './TodosBoard'
import TodosTop from './TodosTop'
import { useTodos } from './components/hooks/useTodos'


const TodosList = (): React.JSX.Element =>{

    const { 
  todos, 
  activeFilters, 
  handleAddTodo, 
  handleDeleteTodo, 
  handleDeleteAll, 
  handleToggleFilter,
  updateTodo,
  sortOrder,
  toggleSortOrder,
} = useTodos()

    return <div>
        <TodosTop handleAddTodo={handleAddTodo} handleDeleteAll={handleDeleteAll} />
        <TodoFilter activeFilters={activeFilters} handleToggleFilter={handleToggleFilter} sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} 
            />
        <TodosBoard todos={todos} handleDelete={handleDeleteTodo} updateTodo={updateTodo} />
    </div>
}

export default TodosList