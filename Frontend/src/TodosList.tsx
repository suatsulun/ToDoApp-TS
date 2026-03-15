import TodoFilter from './TodoFilter'
import TodosBoard from './TodosBoard'
import TodosTop from './TodosTop'
import { useTodos } from './components/hooks/useTodos'
import { TodoPages } from './TodoPages'


const TodosList = (): React.JSX.Element => {

    const {
        todos,
        activeFilters,
        sortOrder,
        toggleSortOrder,
        handleAddTodo,
        handleDeleteTodo,
        handleDeleteAll,
        handleToggleFilter,
        updateTodo,
        currentPage,
        handlePageChange,
        totalTodos,
        pageSize,
        setPageSize,
    } = useTodos()

    return <div className="flex flex-col gap-4">
        <TodosTop handleAddTodo={handleAddTodo} handleDeleteAll={handleDeleteAll} />
        <TodoFilter activeFilters={activeFilters} handleToggleFilter={handleToggleFilter} sortOrder={sortOrder} toggleSortOrder={toggleSortOrder}
        />
        <TodosBoard todos={todos} handleDelete={handleDeleteTodo} updateTodo={updateTodo} />
        {totalTodos > 0 && (
            <TodoPages 
                currentPage={currentPage}
                totalTodos={totalTodos}
                pageSize={pageSize}
                setPageSize={setPageSize}
                handlePageChange={handlePageChange}
            />
        )}
    </div>
}

export default TodosList