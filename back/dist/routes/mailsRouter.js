"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const envs_1 = require("../config/envs");
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailsRouter = (0, express_1.Router)();
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    // service: "gmail",
    auth: {
        user: envs_1.USER_MAIL,
        pass: envs_1.USER_MAIL_PASSWORD,
    },
});
mailsRouter.post("/", (req, res) => {
    const { name, email, concern } = req.body;
    const mailOptions = {
        from: email,
        to: envs_1.USER_MAIL,
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
mailsRouter.post("/confirmappointment", (req, res) => {
    const { name, email, service, date, time } = req.body;
    const [year, month, day] = date.split("-");
    const mailOptions = {
        from: `"Ana Adelina" <${envs_1.USER_MAIL}>`,
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
mailsRouter.post("/cancelappointment", (req, res) => {
    const { name, email, service, date, time } = req.body;
    const [year, month, day] = date.split("-");
    const mailOptions = {
        from: `"Ana Adelina" <${envs_1.USER_MAIL}>`,
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
exports.default = mailsRouter;
