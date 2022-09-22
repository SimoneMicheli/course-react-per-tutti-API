import bodyParser from "body-parser"
import { Router } from "express"
import { existingToDoSchema, newToDoSchema } from "../models"
import * as controller from "./todoController"

const router = Router()
const jsonParser = bodyParser.json()

const newToDoValidator = controller.ToDoValidator(newToDoSchema)
const updateToDoValidator = controller.ToDoValidator(existingToDoSchema)

router.get("/", controller.getList)
router.get("/:id", controller.getToDo)
router.post("/", jsonParser, newToDoValidator, controller.create)
router.put("/:id", jsonParser, updateToDoValidator, controller.update)
router.delete("/:id", updateToDoValidator, controller.del)

export default router
