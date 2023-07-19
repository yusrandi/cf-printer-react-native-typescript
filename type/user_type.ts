export enum ROLE{
    ADMIN = "ADMIN", PAKAR = "PAKAR", USER = "USER"
}

export type UserType = {
    id: number;
    email: string
    name: string
    role: ROLE
};

export type UserTypeResponse = {
    responsecode: number
    responsemsg: string
    responsedata: UserType[]
};

export const EmptyUserType: UserType = {
    id: 0,
    email: "",
    name: "",
    role: ROLE.USER
};


