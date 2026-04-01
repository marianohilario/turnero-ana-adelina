import { AppDataSource } from "./config/data-source";
import { Services } from "./entities/Services";

const servicesData = [
    {
        title: "Manicura Básica",
        description: "Limado, cutícula y esmaltado tradicional para uñas naturales.",
        duration: "00:30:00",
        price: 3500,
        img: "/ManicureBASIC.png",
    },
    {
        title: "Manicura Express",
        description: "Esmaltado rápido sin tratamiento de cutícula, ideal para retoques.",
        duration: "00:20:00",
        price: 2500,
        img: "/manicureEXPRESS.png",
    },
    {
        title: "Manicura Premium",
        description: "Tratamiento completo con exfoliación, hidratación y esmaltado a elección.",
        duration: "01:00:00",
        price: 6500,
        img: "/manicurePREMIUM.png",
    },
    {
        title: "Pedicura Básica",
        description: "Limado, cutícula, tratamiento de callosidades y esmaltado tradicional.",
        duration: "00:45:00",
        price: 4500,
        img: "/PedicuraBASIC.png",
    },
    {
        title: "Pedicura Premium",
        description: "Pedicura completa con exfoliación, masaje relajante e hidratación profunda.",
        duration: "01:15:00",
        price: 7500,
        img: "/PedicuraPREMIUM.png",
    },
    {
        title: "Podoestetica",
        description: "Tratamiento especializado para el cuidado integral del pie.",
        duration: "01:30:00",
        price: 9000,
        img: "/PODOESTETICA.png",
    },
    {
        title: "Esmaltado Semipermanente",
        description: "Esmaltado de larga duración, resistente y sin secado. Dura hasta 3 semanas.",
        duration: "00:45:00",
        price: 5000,
        img: "/esmaltadoSEMIPERMANENTE.png",
    },
    {
        title: "Esmaltado con Decoración",
        description: "Esmaltado con diseños artísticos personalizados, piedras y detalles únicos.",
        duration: "01:00:00",
        price: 6000,
        img: "/esmaltadoconDECORACION.png",
    },
    {
        title: "Esmaltado Shine",
        description: "Esmaltado con efecto brillo y acabado espejo de altísima duración.",
        duration: "00:50:00",
        price: 5500,
        img: "/esmaltadoSHINE.png",
    },
];

export const seedServices = async (): Promise<void> => {
    const servicesRepo = AppDataSource.getRepository(Services);
    const count = await servicesRepo.count();
    if (count > 0) return;
    await servicesRepo.save(servicesData);
    console.log("Services seeded successfully");
};
