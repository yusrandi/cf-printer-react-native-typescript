import { EvidenceType } from "./evidence_type";
import { KerusakanType } from "./kerusakan_type";

export type PengetahuanTypeResponse = {
    responsecode: number
    responsemsg: string
    responsedata: PengetahuanType[]
};

export type PengetahuanType = {
    id: number;
    kerusakanId: number;
    evidenceId: number;
    bobot: number;
    kerusakan?: KerusakanType | null
    evidence?: EvidenceType | null
};
export const EmptyPengetahuanType = {
    id: 0,
    kerusakanId: 0,
    evidenceId: 0,
    bobot: 0
};