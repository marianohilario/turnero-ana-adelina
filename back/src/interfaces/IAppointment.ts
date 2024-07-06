type TUserStatus = "active" | "cancelled";

interface IAppointment {
    id: number;
    date: string;
    time: string;
    UserId: number;
    status: TUserStatus;
}

export default IAppointment;
