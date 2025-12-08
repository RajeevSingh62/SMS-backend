import { Router } from "express"; 
import { createParent, getAllParent, getParentById, updateParent, deleteParent } from "./parent.controller";


const router=Router();
router.post("/",createParent);
router.get("/all",getAllParent);
router.get("/:id",getParentById);
router.patch("/:id",updateParent);
router.delete("/:id",deleteParent)