import { validate as uuidValidate, version as uuidVersion } from "uuid"
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
  completed_at: yup.date().when("completed", {
    is: true,
    then: (schema) => schema.required("completed_at is a required field if completed is set to true"),
  }),
  description: yup.string(),
  id: yup
    .string()
    .required()
    .test("uuid", "Invalid UUID", (value?: string) => {
      if (!value) return false
      return uuidValidate(value) && uuidVersion(value) === 4
    }),
})

export { ToDo, toDoSchema }
