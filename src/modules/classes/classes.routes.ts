import { Router } from "express";
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} from "./classes.controller";

// import auth from "../../middleware/auth.middleware";
// import role from "../../middleware/role.middleware";

const router = Router();

router.post(
  "/",

  createClass
);

router.get(
  "/",

  getAllClasses
);


router.get(
  "/:id",

  getClassById
);


router.patch(
  "/:id",


  updateClass
);


router.delete(
  "/:id",

  deleteClass
);

export default router;
