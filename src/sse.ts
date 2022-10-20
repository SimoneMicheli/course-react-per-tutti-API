import { Request, Response } from "express"
import { v4 as uuid } from "uuid"
import { ToDo } from "./models"

type EventsType = "ADD" | "DELETE" | "UPDATE"

const clients = new Map<Request, Response>()

type SSEvent<T> = {
  type: EventsType
  data: T
}

export function onClientConnect(req: Request, res: Response) {
  console.debug("New client connected")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Connection", "keep-alive")
  res.flushHeaders() // flush the headers to establish SSE with client

  clients.set(req, res)

  res.on("close", () => {
    console.debug("Connection close by the client")
    clients.delete(req)
    res.end()
  })
}

/**
 * send JSON event to the client
 */
function sendEvent<T extends Record<string, unknown>>(event: SSEvent<T>) {
  clients.forEach((client) => {
    client.write(`event: ${event.type}\n`)
    client.write(`data: ${JSON.stringify(event.data)}\n`)
    client.write(`id: ${uuid()}\n\n`)
  })
}

/**
 * Utility function to create and send events
 */
export function sendAddEvent(todo: ToDo) {
  sendEvent({
    type: "ADD",
    data: todo,
  })
}

export function sendUpdateEvent(todo: ToDo) {
  sendEvent({
    type: "UPDATE",
    data: todo,
  })
}

export function sendDeleteEvent(todo: ToDo) {
  sendEvent({
    type: "DELETE",
    data: todo,
  })
}
