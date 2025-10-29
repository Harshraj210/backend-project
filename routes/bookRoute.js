import express from "express"
import { addBooks,getallBooks,getbooksId,updateBooks,deleteBooks } from "../controllers/bookController"

const router = express.Router()
router.post("/",addBooks)
router.get("/",getallBooks)
router.get("/:id",getbooksId)
router.put("/:id",updateBooks)
router.delete("/:id",deleteBooks)
export default router