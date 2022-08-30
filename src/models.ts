import * as yup from "yup"

type ToDo = {
  id: string
  title: string
  completed: boolean
  created_at: Date
  completed_at?: Date
  description?: string
}

const toDoSchema = yup.object({
  title: yup.string().required(),
  completed: yup.boolean().required(),
  created_at: yup.date().required(),
})

export { ToDo, toDoSchema }
