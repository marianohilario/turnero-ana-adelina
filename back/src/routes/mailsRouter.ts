import { Request, Response, Router } from "express";
import { USER_MAIL, USER_MAIL_PASSWORD } from "../config/envs";
import nodemailer from "nodemailer";

const mailsRouter: Router = Router();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    // service: "gmail",
    auth: {
        user: USER_MAIL,
        pass: USER_MAIL_PASSWORD,
    },
});

mailsRouter.post("/", (req: Request, res: Response) => {
    const { name, email, concern } = req.body;
    const mailOptions = {
        from: email,
        to: USER_MAIL,
        subject: `Consulta de ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nConsulta: ${concern}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {

            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: "Email enviado con éxito!" });
    });
});

mailsRouter.post("/confirmappointment", (req: Request, res: Response) => {
    const { name, email, service, date, time } = req.body;
    const [year, month, day] = date.split("-");
    const mailOptions = {
        from: `"Ana Adelina" <${USER_MAIL}>`,
        to: email,
        subject: `Confirmación de cita en Ana Adelina`,
        text: `Hola ${name}, esperamos te encuentres muy bien!\nTe hemos enviado el presente correo para confirmar que la cita que agendaste para el servicio de ${service} el día ${day} de ${month} de ${year} a las ${time}hs ha sido confirmada.\nTe estaremos esperando.\nAtentamente.\nAna Adelina.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {

            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: "Email enviado con éxito!" });
    });
});

mailsRouter.post("/cancelappointment", (req: Request, res: Response) => {
    const { name, email, service, date, time } = req.body;
    const [year, month, day] = date.split("-");
    const mailOptions = {
        from: `"Ana Adelina" <${USER_MAIL}>`,
        to: email,
        subject: `Cancelación de cita en Ana Adelina`,
        text: `Hola ${name}, esperamos te encuentres muy bien!\nTe hemos enviado el presente correo para confirmar que la cita que agendaste para el servicio de ${service} el día ${day} de ${month} de ${year} a las ${time}hs ha sido CANCELADA tal como lo has solicitado. Si la acción no la realizaste vos, por favor ponete en contacto con nosotros.\nAtentamente.\nAna Adelina.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {

            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: "Email enviado con éxito!" });
    });
});

export default mailsRouter;
