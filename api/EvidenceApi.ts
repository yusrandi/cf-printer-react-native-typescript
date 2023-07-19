

import { EvidenceType, EvidenceTypeResponse } from '../type/evidence_type'
import ApiManager from './ApiManager'
import axios from 'axios'

export async function EvidenceApi(): Promise<EvidenceTypeResponse>{
    try {
        let evidenceResponse: EvidenceTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager('/api/evidence')
            .then(function (response) {
                evidenceResponse = response.data
                // console.log(EvidenceResponse);
            })
            .catch(function (error) {
                evidenceResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(EvidenceResponse);

            })
            return evidenceResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}
export async function EvidenceCreateApi(evidence: EvidenceType): Promise<EvidenceTypeResponse>{
    try {
        let evidenceResponse: EvidenceTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager('/api/evidence',{
            method:"POST",
            headers:{
                'content-type':"application/json"
            },
            data: {
                evidenceCode: evidence.evidenceCode,
                evidenceName: evidence.evidenceName
            }
        })
            .then(function (response) {
                evidenceResponse = response.data
                // console.log(EvidenceResponse);
            })
            .catch(function (error) {
                evidenceResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(EvidenceResponse);

            })
            return evidenceResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}
export async function EvidenceUpdateApi(evidence: EvidenceType): Promise<EvidenceTypeResponse>{
    try {
        let evidenceResponse: EvidenceTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager(`/api/evidence/${evidence.id}`,{
            method:"PATCH",
            headers:{
                'content-type':"application/json"
            },
            data: {
                evidenceCode: evidence.evidenceCode,
                evidenceName: evidence.evidenceName
            }
        })
            .then(function (response) {
                evidenceResponse = response.data
                // console.log(EvidenceResponse);
            })
            .catch(function (error) {
                evidenceResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(EvidenceResponse);

            })
            return evidenceResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}
export async function EvidenceDeleteApi(id: number): Promise<EvidenceTypeResponse>{
    try {
        let evidenceResponse: EvidenceTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager(`/api/evidence/${id}`,{
            method:"DELETE",
            headers:{
                'content-type':"application/json"
            },
        })
            .then(function (response) {
                evidenceResponse = response.data
                // console.log(EvidenceResponse);
            })
            .catch(function (error) {
                evidenceResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(EvidenceResponse);

            })
            return evidenceResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}