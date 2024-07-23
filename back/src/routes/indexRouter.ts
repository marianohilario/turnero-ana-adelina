import { Router } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";

const indexRouter: Router = Router();
console.log("entró al indexRouter");

indexRouter.use("/users", usersRouter);
indexRouter.use("/appointments", appointmentsRouter);

export default indexRouter;
