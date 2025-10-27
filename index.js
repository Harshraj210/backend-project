import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db/connectdb.js"

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT
app.get("/", (req, res) => {
  res.send("Server running");
});


app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})