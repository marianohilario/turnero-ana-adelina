import { Router } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";
import servicesRouter from "./servicesRouter";
import mailsRouter from "./mailsRouter";

const indexRouter: Router = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/appointments", appointmentsRouter);
indexRouter.use("/services", servicesRouter);
indexRouter.use("/mails", mailsRouter);

export default indexRouter;
