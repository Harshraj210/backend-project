import express from "express"
import { addBooks,getallBooks,getbooksId,updateBooks,deleteBooks } from "../controllers/bookController"

const router = express.Router()
router.post("/",addBooks)
