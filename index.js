import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db/connectdb.js"
import userRoute from "./routes/userRoute.js"
import bookRoute from "./routes/bookRoute.js"
dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/users",userRoute)
app.use("/api/books",bookRoute)

const port = process.env.PORT
app.get("/", (req, res) => {
  res.send("Server running");
});


app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
})