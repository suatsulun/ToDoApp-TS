export type Todo = {
  id: number
  text: string
  createdAt: string
  status: string
}

export type TodoCardProps = {
  todo: Todo
  handleDelete: (id: number) => Promise<void>
  updateTodo: (id: number, text: string, status: string) => Promise<void>
}

export type TodosBoardProps = {
  todos: Todo[]
  handleDelete: (id: number) => Promise<void>
  updateTodo: (id: number, text: string, status: string) => Promise<void>
}

export type TodosTopProps = {
  handleAddTodo: (text: string, status: string) => Promise<void>
  handleDeleteAll: () => void
}

export type DeleteAllProps = {
  handleDeleteAll: () => void
}

export type TodosTypeProps = {
  selectedType: string
  setSelectedType: (type: string) => void
}

export type TodoFilterProps = {
  activeFilters: string[]
  handleToggleFilter: (status: string) => void
  sortOrder: 'asc' | 'desc';
  toggleSortOrder: () => void;
}

export type todoAPI = {
  text: string
  status: string
}

export type TodoPagesProps = {
  currentPage: number
  totalTodos: number
  pageSize: number
  setPageSize: (size: number) => void
  handlePageChange: (page: number) => void
}