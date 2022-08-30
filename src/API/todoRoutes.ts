import bodyParser from "body-parser"
import { Router } from "express"
import * as controller from "./todoController"

const router = Router()
const jsonParser = bodyParser.json()

router.get("/", controller.getList)
router.get("/:id", controller.getToDo)
router.post("/", jsonParser, controller.validateToDo, controller.create)
router.put("/:id", jsonParser, controller.update)
router.delete("/:id", controller.del)

export default router
