import { Request, Response, NextFunction } from "express"
import { ValidationError } from "yup"
import { ToDo, toDoSchema } from "../models"
import toDoList, { findById, findIndexById } from "../todoList"

export function getList(_: Request, res: Response) {
  res.send(toDoList)
}

export function getToDo(req: Request, res: Response) {
  const id = req.params.id

  const todo = findById(id)
  if (!todo) return res.sendStatus(400)

  return res.send(todo)
}

export function create(req: Request, res: Response) {
  const todo = req.body as ToDo
  todo.id = (toDoList.length + 1).toString()
  toDoList.push(todo)

  res.status(201).send(todo)
}

export function update(req: Request, res: Response) {
  const id = req.params.id

  if (!id) return res.sendStatus(400)
  const index = findIndexById(id)

  if (index === -1) return res.sendStatus(400)

  const todo = req.body as ToDo

  toDoList.splice(index, 1, todo)

  res.send(todo)
}

export function del(req: Request, res: Response) {
  const id = req.params.id

  if (!id) return res.sendStatus(400)
  const index = findIndexById(id)

  if (index === -1) return res.sendStatus(400)

  toDoList.splice(index, 1)

  return res.sendStatus(200)
}

export function validateToDo(req: Request, res: Response, next: NextFunction) {
  toDoSchema
    .validate(req.body, {
      // collect all errors
      abortEarly: false,
      // Remove unspecified keys from objects
      stripUnknown: true,
    })
    .then((values) => {
      req.body = values
      return next()
    })
    .catch((err: ValidationError) => {
      return next(err.errors.join(","))
    })
}
