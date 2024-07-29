import { AppDataSource } from "../config/data-source";
import { Services } from "../entities/Services";
import AuxError from "../utils/AuxiliarError";

export const ServicesRepository = AppDataSource.getRepository(Services).extend({
    findById: async function (id: number): Promise<Services> {
        const service = await this.findOneBy({ id });
        if (service) return service;
        throw new AuxError("Invalid serviceId", 400);
    },
});
