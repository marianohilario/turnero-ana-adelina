import { Router } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";
import servicesRouter from "./servicesRouter";

const indexRouter: Router = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/appointments", appointmentsRouter);
indexRouter.use("/services", servicesRouter);

export default indexRouter;
