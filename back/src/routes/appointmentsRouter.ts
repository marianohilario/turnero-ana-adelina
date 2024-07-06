import { Router } from "express";
import {
    cancelAppointment,
    getAppointments,
    getAppointment,
    scheduleAppointment,
} from "../controllers/appointmentsControllers";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAppointments);
appointmentsRouter.get("/:id", getAppointment);
appointmentsRouter.post("/schedule", scheduleAppointment);
appointmentsRouter.put("/cancel", cancelAppointment);

export default appointmentsRouter;
