import { Router } from "express";
import {
    cancelAppointment,
    getAppointment,
    scheduleAppointment,
} from "../controllers/appointmentsControllers";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAppointment);
appointmentsRouter.post("/schedule", scheduleAppointment);
appointmentsRouter.put("/cancel", cancelAppointment);

export default appointmentsRouter;
