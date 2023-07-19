import { PengetahuanType } from "./pengetahuan_type";

export type KerusakanTypeResponse = {
    responsecode: number
    responsemsg: string
    responsedata: KerusakanType[]
};

export type KerusakanType = {
    id: number;
    kerusakanCode: string
    kerusakanName: string
    perbaikan: string
    pengetahuans?: PengetahuanType[] | null
};
export const EmptyKerusakanType: KerusakanType = {
    id: 0,
    kerusakanCode: "",
    kerusakanName: "",
    perbaikan: "",
    pengetahuans: []
};