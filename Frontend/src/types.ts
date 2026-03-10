export type Todo = {
  id: number
  text: string
  createdAt: string
  totype: string
}

export type TodoCardProps = {
  todo: Todo
  handleDelete: (id: number) => void
}

export type TodosBoardProps = {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
}

export type TodosTypeProps = {
  selectedType: string
  setSelectedType: (type: string) => void
}