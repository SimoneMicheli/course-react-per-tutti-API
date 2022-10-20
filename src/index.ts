import cors from "cors"
import express from "express"
import todoRoutes from "./API/todoRoutes"

const app = express()
const port = 5000

app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

app.use("/api/todo", todoRoutes)

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`)
})
