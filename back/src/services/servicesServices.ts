import { ServicesRepository } from "../repositories/ServicesRepository";
import AuxError from "../utils/AuxiliarError";

export const getServices = async () => {
    const allServices = await ServicesRepository.find({
        order: {
            id: "ASC",
        },
    });
    if (allServices.length !== 0) return allServices;
    throw new AuxError("No services to show", 404);
};
