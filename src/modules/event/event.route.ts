import { Router } from "express";


import { createEvent, deleteEvent, getAllEvent, getSEventById, updateEvent } from "./event.controller";

const router = Router();

router.post("/",createEvent);
router.get("/", getAllEvent);
router.get("/:id",getSEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
