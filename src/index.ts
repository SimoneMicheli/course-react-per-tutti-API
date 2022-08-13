import express from "express"
import cors from "cors"
import toDoList from "./todoList"

const app = express()
const port = 5000

app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

app.get("/api/todo/", (req, res) => {
  res.send(toDoList)
})

app.listen(port, () => {
  console.log(`Express server is running on post ${port}`)
})
