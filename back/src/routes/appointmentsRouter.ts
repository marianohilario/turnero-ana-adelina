import { Router } from "express";
import {
    cancelAppointment,
    getAllAppointments,
    getAppointmentById,
    scheduleAppointment,
} from "../controllers/appointmentsControllers";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", getAllAppointments);
appointmentsRouter.get("/:id", getAppointmentById);
appointmentsRouter.post("/schedule", scheduleAppointment);
appointmentsRouter.put("/cancel", cancelAppointment);

export default appointmentsRouter;
