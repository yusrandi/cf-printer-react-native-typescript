
export type EvidenceTypeResponse = {
    responsecode: number
    responsemsg: string
    responsedata: EvidenceType[]
};

export type EvidenceType = {
    id: number;
    evidenceCode: string
    evidenceName: string
};
export const EmptyEvidenceType: EvidenceType = {
    id: 0,
    evidenceCode: "",
    evidenceName: ""
};