import { Router } from "express";
import { getAllServices } from "../controllers/servicesControllers";

const servicesRouter: Router = Router();

servicesRouter.get("/", getAllServices);

export default servicesRouter;
