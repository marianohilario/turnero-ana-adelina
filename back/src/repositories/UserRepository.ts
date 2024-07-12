import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import AuxError from "../utils/AuxiliarError";

export const UserRepository = AppDataSource.getRepository(User).extend({
    findById: async function (id: number): Promise<User> {
        const user = await this.findOneBy({ id });
        if (user) return user;
        throw new AuxError("Invalid Id", 400);
    },
});
