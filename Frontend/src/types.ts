export type Todo = {
  id: number
  text: string
  createdAt: string
}

export type TodoCardProps = {
  todo: Todo
  handleDelete: (id: number) => void
}

export type TodosBoardProps = {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
}