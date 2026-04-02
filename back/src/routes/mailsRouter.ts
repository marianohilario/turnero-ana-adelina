import { Request, Response, Router } from "express";
import { USER_MAIL, USER_MAIL_PASSWORD } from "../config/envs";
import nodemailer from "nodemailer";

const mailsRouter: Router = Router();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: USER_MAIL,
        pass: USER_MAIL_PASSWORD,
    },
});

function confirmationEmailHtml(
    name: string,
    service: string,
    day: string,
    month: string,
    year: string,
    time: string
): string {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Confirmación de Cita</title>
</head>
<body style="margin:0;padding:0;background-color:#fdf2f6;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#fdf2f6">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;box-shadow:0 8px 48px rgba(226,92,127,0.18);">

          <!-- HEADER -->
          <tr>
            <td bgcolor="#e25c7f" style="background:linear-gradient(82.3deg,#e25c7f 40%,#ff92b4 94%);padding:44px 40px 36px;text-align:center;">
              <p style="margin:0 0 12px 0;font-family:Georgia,sans-serif;font-size:9px;font-weight:normal;letter-spacing:5px;text-transform:uppercase;color:rgba(255,255,255,0.72);">&#9670; &nbsp; S A L &Oacute; N &nbsp; D E &nbsp; B E L L E Z A &nbsp; &#9670;</p>
              <h1 style="margin:0;font-family:Georgia,serif;font-size:46px;font-weight:normal;font-style:italic;color:#ffffff;line-height:1.1;letter-spacing:1px;">Ana Adelina</h1>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-top:18px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="44" height="1" bgcolor="rgba(255,255,255,0.3)" style="background:rgba(255,255,255,0.3);font-size:0;line-height:0;">&nbsp;</td>
                        <td style="padding:0 10px;color:rgba(255,255,255,0.55);font-size:9px;font-family:Georgia,serif;">&#9670;</td>
                        <td width="44" height="1" bgcolor="rgba(255,255,255,0.3)" style="background:rgba(255,255,255,0.3);font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BADGE -->
          <tr>
            <td bgcolor="#ffffff" style="padding:30px 40px 0;text-align:center;">
              <span style="display:inline-block;background:linear-gradient(82.3deg,#e25c7f 40%,#ff92b4 94%);color:#ffffff;font-family:Georgia,sans-serif;font-size:9px;letter-spacing:4px;text-transform:uppercase;padding:7px 24px;border-radius:30px;">&#10003; &nbsp; Cita Confirmada</span>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td bgcolor="#ffffff" style="padding:28px 40px 16px;">
              <p style="margin:0 0 14px 0;font-family:Georgia,sans-serif;font-size:15px;color:#555555;line-height:1.75;">
                Hola <strong style="color:#1a0a0f;">${name}</strong>, &iexcl;esperamos que te encuentres muy bien!
              </p>
              <p style="margin:0 0 26px 0;font-family:Georgia,sans-serif;font-size:13px;color:#999999;line-height:1.8;">
                Tu cita ha sido confirmada con &eacute;xito. Aqu&iacute; encontrar&aacute;s todos los detalles:
              </p>

              <!-- DETAILS CARD -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#fdf2f6" style="border-radius:14px;">
                <tr>
                  <td style="padding:20px 24px 16px;border-bottom:1px solid rgba(226,92,127,0.15);">
                    <p style="margin:0 0 5px 0;font-family:Georgia,sans-serif;font-size:8px;letter-spacing:3px;text-transform:uppercase;color:#e25c7f;">Servicio</p>
                    <p style="margin:0;font-family:Georgia,serif;font-size:22px;font-style:italic;color:#1a0a0f;">${service}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="55%" style="padding-right:16px;border-right:1px solid rgba(226,92,127,0.18);vertical-align:top;">
                          <p style="margin:0 0 5px 0;font-family:Georgia,sans-serif;font-size:8px;letter-spacing:3px;text-transform:uppercase;color:#e25c7f;">Fecha</p>
                          <p style="margin:0;font-family:Georgia,serif;font-size:19px;font-style:italic;color:#1a0a0f;">${day} de ${month} de ${year}</p>
                        </td>
                        <td width="45%" style="padding-left:20px;vertical-align:top;">
                          <p style="margin:0 0 5px 0;font-family:Georgia,sans-serif;font-size:8px;letter-spacing:3px;text-transform:uppercase;color:#e25c7f;">Hora</p>
                          <p style="margin:0;font-family:Georgia,serif;font-size:19px;font-style:italic;color:#1a0a0f;">${time} hs</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CLOSING -->
          <tr>
            <td bgcolor="#ffffff" style="padding:20px 40px 36px;text-align:center;">
              <p style="margin:0 0 22px 0;font-family:Georgia,sans-serif;font-size:13px;color:#aaaaaa;line-height:1.85;">
                &iexcl;Te estaremos esperando con todo el cuidado y atenci&oacute;n que merecés!<br>
                Ante cualquier duda, no dudes en contactarnos.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:18px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" height="1" bgcolor="#f0c8d4" style="background:#f0c8d4;font-size:0;line-height:0;">&nbsp;</td>
                        <td style="padding:0 8px;color:#e25c7f;font-size:8px;font-family:Georgia,serif;">&#9670;</td>
                        <td width="28" height="1" bgcolor="#f0c8d4" style="background:#f0c8d4;font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 2px 0;font-family:Georgia,serif;font-size:14px;font-style:italic;color:#c9607c;">Atentamente,</p>
              <p style="margin:0;font-family:Georgia,serif;font-size:20px;font-style:italic;color:#1a0a0f;">Ana Adelina</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td bgcolor="#e25c7f" style="background:linear-gradient(82.3deg,#e25c7f 40%,#ff92b4 94%);padding:18px 40px;text-align:center;">
              <p style="margin:0;font-family:Georgia,sans-serif;font-size:10px;letter-spacing:1px;color:rgba(255,255,255,0.75);">&copy; Ana Adelina &middot; Sal&oacute;n de Belleza</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function cancellationEmailHtml(
    name: string,
    service: string,
    day: string,
    month: string,
    year: string,
    time: string
): string {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Cancelación de Cita</title>
</head>
<body style="margin:0;padding:0;background-color:#fdf2f6;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#fdf2f6">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;box-shadow:0 8px 48px rgba(226,92,127,0.18);">

          <!-- HEADER -->
          <tr>
            <td bgcolor="#e25c7f" style="background:linear-gradient(82.3deg,#e25c7f 40%,#ff92b4 94%);padding:44px 40px 36px;text-align:center;">
              <p style="margin:0 0 12px 0;font-family:Georgia,sans-serif;font-size:9px;font-weight:normal;letter-spacing:5px;text-transform:uppercase;color:rgba(255,255,255,0.72);">&#9670; &nbsp; S A L &Oacute; N &nbsp; D E &nbsp; B E L L E Z A &nbsp; &#9670;</p>
              <h1 style="margin:0;font-family:Georgia,serif;font-size:46px;font-weight:normal;font-style:italic;color:#ffffff;line-height:1.1;letter-spacing:1px;">Ana Adelina</h1>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-top:18px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="44" height="1" bgcolor="rgba(255,255,255,0.3)" style="background:rgba(255,255,255,0.3);font-size:0;line-height:0;">&nbsp;</td>
                        <td style="padding:0 10px;color:rgba(255,255,255,0.55);font-size:9px;font-family:Georgia,serif;">&#9670;</td>
                        <td width="44" height="1" bgcolor="rgba(255,255,255,0.3)" style="background:rgba(255,255,255,0.3);font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BADGE -->
          <tr>
            <td bgcolor="#ffffff" style="padding:30px 40px 0;text-align:center;">
              <span style="display:inline-block;background:#ffffff;color:#e25c7f;border:1px solid #e25c7f;font-family:Georgia,sans-serif;font-size:9px;letter-spacing:4px;text-transform:uppercase;padding:7px 24px;border-radius:30px;">&#10007; &nbsp; Cita Cancelada</span>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td bgcolor="#ffffff" style="padding:28px 40px 16px;">
              <p style="margin:0 0 14px 0;font-family:Georgia,sans-serif;font-size:15px;color:#555555;line-height:1.75;">
                Hola <strong style="color:#1a0a0f;">${name}</strong>, &iexcl;esperamos que te encuentres muy bien!
              </p>
              <p style="margin:0 0 26px 0;font-family:Georgia,sans-serif;font-size:13px;color:#999999;line-height:1.8;">
                Te confirmamos que la siguiente cita ha sido <strong style="color:#e25c7f;">cancelada</strong> seg&uacute;n lo solicitado:
              </p>

              <!-- DETAILS CARD -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#fdf2f6" style="border-radius:14px;">
                <tr>
                  <td style="padding:20px 24px 16px;border-bottom:1px solid rgba(226,92,127,0.15);">
                    <p style="margin:0 0 5px 0;font-family:Georgia,sans-serif;font-size:8px;letter-spacing:3px;text-transform:uppercase;color:#e25c7f;">Servicio</p>
                    <p style="margin:0;font-family:Georgia,serif;font-size:22px;font-style:italic;color:#1a0a0f;">${service}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="55%" style="padding-right:16px;border-right:1px solid rgba(226,92,127,0.18);vertical-align:top;">
                          <p style="margin:0 0 5px 0;font-family:Georgia,sans-serif;font-size:8px;letter-spacing:3px;text-transform:uppercase;color:#e25c7f;">Fecha</p>
                          <p style="margin:0;font-family:Georgia,serif;font-size:19px;font-style:italic;color:#1a0a0f;">${day} de ${month} de ${year}</p>
                        </td>
                        <td width="45%" style="padding-left:20px;vertical-align:top;">
                          <p style="margin:0 0 5px 0;font-family:Georgia,sans-serif;font-size:8px;letter-spacing:3px;text-transform:uppercase;color:#e25c7f;">Hora</p>
                          <p style="margin:0;font-family:Georgia,serif;font-size:19px;font-style:italic;color:#1a0a0f;">${time} hs</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- NOTICE -->
          <tr>
            <td bgcolor="#ffffff" style="padding:4px 40px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left:3px solid #e25c7f;border-radius:2px;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0;font-family:Georgia,sans-serif;font-size:12px;color:#888888;line-height:1.85;">
                      Si no fuiste vos quien realiz&oacute; esta cancelaci&oacute;n, por favor <strong style="color:#e25c7f;">comun&iacute;cate con nosotros</strong> a la brevedad posible.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CLOSING -->
          <tr>
            <td bgcolor="#ffffff" style="padding:16px 40px 36px;text-align:center;">
              <p style="margin:0 0 22px 0;font-family:Georgia,sans-serif;font-size:13px;color:#aaaaaa;line-height:1.85;">
                Esperamos verte pronto nuevamente.<br>
                &iexcl;Siempre ser&aacute;s bienvenida!
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom:18px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" height="1" bgcolor="#f0c8d4" style="background:#f0c8d4;font-size:0;line-height:0;">&nbsp;</td>
                        <td style="padding:0 8px;color:#e25c7f;font-size:8px;font-family:Georgia,serif;">&#9670;</td>
                        <td width="28" height="1" bgcolor="#f0c8d4" style="background:#f0c8d4;font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 2px 0;font-family:Georgia,serif;font-size:14px;font-style:italic;color:#c9607c;">Atentamente,</p>
              <p style="margin:0;font-family:Georgia,serif;font-size:20px;font-style:italic;color:#1a0a0f;">Ana Adelina</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td bgcolor="#e25c7f" style="background:linear-gradient(82.3deg,#e25c7f 40%,#ff92b4 94%);padding:18px 40px;text-align:center;">
              <p style="margin:0;font-family:Georgia,sans-serif;font-size:10px;letter-spacing:1px;color:rgba(255,255,255,0.75);">&copy; Ana Adelina &middot; Sal&oacute;n de Belleza</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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
        text: `Hola ${name}, tu cita para el servicio de ${service} el día ${day}/${month}/${year} a las ${time}hs ha sido confirmada. ¡Te estaremos esperando! Atentamente, Ana Adelina.`,
        html: confirmationEmailHtml(name, service, day, month, year, time),
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
        text: `Hola ${name}, tu cita para el servicio de ${service} el día ${day}/${month}/${year} a las ${time}hs ha sido CANCELADA. Si no realizaste esta acción, por favor contáctanos. Atentamente, Ana Adelina.`,
        html: cancellationEmailHtml(name, service, day, month, year, time),
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: "Email enviado con éxito!" });
    });
});

export default mailsRouter;
