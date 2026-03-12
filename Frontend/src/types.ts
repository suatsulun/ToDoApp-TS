export type Todo = {
  id: number
  text: string
  createdAt: string
  status: string
}

export type TodoCardProps = {
  todo: Todo
  handleDelete: (id: number) => void
}

export type TodosBoardProps = {
  todos: Todo[]
  handleDelete: (id: number) => void
}

export type TodosTopProps = {
  handleAddTodo: (text: string, status: string) => void
  handleDeleteAll: () => void
}

export type DeleteAllProps ={
  handleDeleteAll: () => void
}

export type TodosTypeProps = {
  selectedType: string
  setSelectedType: (type: string) => void
}

export type TodoFilterProps = {
  activeFilters: string[]
  handleToggleFilter: (status: string) => void
}