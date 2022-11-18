import { v4 as uuid } from "uuid"
import { ToDo } from "./models"

const todos: ToDo[] = [
  { id: `${uuid()}`, title: "Elemento 1", completed: false, created_at: new Date(2022, 6, 4) },
  { id: `${uuid()}`, title: "Elemento 2", completed: false, created_at: new Date(2022, 4, 4) },
]

export function findIndexById(id: string) {
  return todos.findIndex((v) => v.id === id)
}

export function findById(id: string) {
  return todos.find((v) => v.id === id)
}

export default todos
