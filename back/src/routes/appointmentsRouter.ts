import { Router } from "express";
import {
    cancelAppointment,
    getAppointments,
    getAppointment,
    scheduleAppointment,
} from "../controllers/appointmentsControllers";
import { appointmentSchedule } from "../middlewares/appointmentSchedule";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAppointments);
appointmentsRouter.get("/:id", getAppointment);
appointmentsRouter.post("/schedule", appointmentSchedule, scheduleAppointment);
appointmentsRouter.put("/cancel/:id", cancelAppointment);

export default appointmentsRouter;
