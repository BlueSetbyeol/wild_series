import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define program-related routes

import programActions from "./modules/program/programActions";

router.get("/api/programs", programActions.browse);
router.get("/api/program/:id", programActions.read);
// router.put("/api/program/:id", programActions.read);
router.post("/api/program/", programActions.read);
// router.delete("/api/program/:id", programActions.read);

// Define category-related routes

import categoryActions from "./modules/category/categoryActions";

router.get("/api/categories", categoryActions.browse);
router.get("/api/category/:id", categoryActions.read);
router.put("/api/category/:id", categoryActions.edit);
router.post("/api/category/", categoryActions.add);
router.delete("/api/category/:id", categoryActions.destroy);

/* ************************************************************************* */

import sayActions from "./modules/say/sayActions";

router.get("/", sayActions.sayWelcome);

export default router;
