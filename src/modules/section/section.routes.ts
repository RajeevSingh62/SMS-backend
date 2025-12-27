import { Router } from "express";

import upload from "../../middleware/upload";
import { createSection, deleteSection, getAllSections, getSectionById, updateSection } from "../section/section.controller";

const router = Router();

router.post(
  "/",

  createSection
);


router.get(
  "/",

  getAllSections
);


router.get(
  "/:id",

  getSectionById
);


router.patch(
  "/:id",

  updateSection
);


router.delete(
  "/:id",


  deleteSection
);


export default router;
