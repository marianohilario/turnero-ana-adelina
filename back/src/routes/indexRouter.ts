import { Router } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";
import { getAppointments } from "../controllers/appointmentsControllers";

const indexRouter: Router = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/appointment", appointmentsRouter);
indexRouter.get("/appointments", getAppointments);

export default indexRouter;
