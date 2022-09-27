import * as yup from "yup"

type ToDo = {
  id: string
  title: string
  completed: boolean
  created_at: Date
  completed_at?: Date
  description?: string
}

const newToDoSchema = yup.object({
  title: yup.string().required(),
  completed: yup.boolean().required(),
  created_at: yup.date().required(),
  completed_at: yup.date().when("completed", {
    is: true,
    then: (schema) => schema.required("completed_at is a required field if completed is set to true"),
  }),
  description: yup.string(),
})

const existingToDoSchema = newToDoSchema.shape({
  id: yup.string().required(),
})

export { ToDo, newToDoSchema, existingToDoSchema }
