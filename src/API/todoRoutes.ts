import bodyParser from "body-parser"
import { Router } from "express"
import { toDoSchema } from "../models"
import * as sse from "../sse"
import * as controller from "./todoController"

const router = Router()
const jsonParser = bodyParser.json()

const toDoValidator = controller.ToDoValidator(toDoSchema)

router.get("/events/", sse.onClientConnect)

router.get("/", controller.getList)
router.get("/:id", controller.getToDo)
router.post("/", jsonParser, toDoValidator, controller.create)
router.put("/:id", jsonParser, toDoValidator, controller.update)
router.delete("/:id", controller.del)

export default router
