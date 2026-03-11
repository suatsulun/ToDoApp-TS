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
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export type TodosTypeProps = {
  selectedType: string
  setSelectedType: (type: string) => void
}