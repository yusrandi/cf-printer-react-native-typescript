
import { PengetahuanType, PengetahuanTypeResponse } from '../type/pengetahuan_type'
import ApiManager from './ApiManager'
import axios from 'axios'

export async function PengetahuanApi(): Promise<PengetahuanTypeResponse>{
    try {
        let pengetahuanResponse: PengetahuanTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager('/api/pengetahuan')
            .then(function (response) {
                pengetahuanResponse = response.data
                // console.log(PengetahuanResponse);
            })
            .catch(function (error) {
                pengetahuanResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(PengetahuanResponse);

            })
            return pengetahuanResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}
export async function PengetahuanCreateApi(pengetahuan: PengetahuanType): Promise<PengetahuanTypeResponse>{
    try {
        let pengetahuanResponse: PengetahuanTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager('/api/pengetahuan',
        {
            method:"POST",
            headers:{
                'content-type':"application/json"
            },
            data: {
                kerusakanId: pengetahuan.kerusakanId,
                evidenceId: pengetahuan.evidenceId,
                bobot: pengetahuan.bobot,
            }
        })
            .then(function (response) {
                pengetahuanResponse = response.data
                // console.log(PengetahuanResponse);
            })
            .catch(function (error) {
                pengetahuanResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(PengetahuanResponse);

            })
            return pengetahuanResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}
export async function PengetahuanUpdateApi(pengetahuan: PengetahuanType): Promise<PengetahuanTypeResponse>{
    try {
        let pengetahuanResponse: PengetahuanTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager(`/api/pengetahuan/${pengetahuan.id}`,
        {
            method:"PATCH",
            headers:{
                'content-type':"application/json"
            },
            data: {
                kerusakanId: pengetahuan.kerusakanId,
                evidenceId: pengetahuan.evidenceId,
                bobot: pengetahuan.bobot,
            }
        })
            .then(function (response) {
                pengetahuanResponse = response.data
                // console.log(PengetahuanResponse);
            })
            .catch(function (error) {
                pengetahuanResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(PengetahuanResponse);

            })
            return pengetahuanResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}
export async function PengetahuanDeleteApi(id: number): Promise<PengetahuanTypeResponse>{
    try {
        let pengetahuanResponse: PengetahuanTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager(`/api/pengetahuan/${id}`,
        {
            method:"DELETE",
            headers:{
                'content-type':"application/json"
            }
        })
            .then(function (response) {
                pengetahuanResponse = response.data
                // console.log(PengetahuanResponse);
            })
            .catch(function (error) {
                pengetahuanResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(PengetahuanResponse);

            })
            return pengetahuanResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}