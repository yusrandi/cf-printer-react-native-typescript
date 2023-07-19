
import { KerusakanType, KerusakanTypeResponse } from '../type/kerusakan_type'
import ApiManager from './ApiManager'
import axios from 'axios'

export async function KerusakanApi(): Promise<KerusakanTypeResponse>{
    try {
        let kerusakanResponse: KerusakanTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager('/api/kerusakan')
            .then(function (response) {
                kerusakanResponse = response.data
                // console.log(kerusakanResponse);
            })
            .catch(function (error) {
                kerusakanResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(kerusakanResponse);

            })
            return kerusakanResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}
export async function KerusakanCreateApi(kerusakan: KerusakanType): Promise<KerusakanTypeResponse>{
    try {
        let kerusakanResponse: KerusakanTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager('/api/kerusakan',{
            method:"POST",
            headers:{
                'content-type':"application/json"
            },
            data: {
                kerusakanCode: kerusakan.kerusakanCode,
                kerusakanName: kerusakan.kerusakanName,
                perbaikan: kerusakan.perbaikan,
            }
            })
            .then(function (response) {
                kerusakanResponse = response.data
                // console.log(kerusakanResponse);
            })
            .catch(function (error) {
                kerusakanResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(kerusakanResponse);

            })
            return kerusakanResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}
export async function KerusakanUpdateApi(kerusakan: KerusakanType): Promise<KerusakanTypeResponse>{
    try {
        let kerusakanResponse: KerusakanTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager(`/api/kerusakan/${kerusakan.id}`,{
            method:"PATCH",
            headers:{
                'content-type':"application/json"
            },
            data: {
                kerusakanCode: kerusakan.kerusakanCode,
                kerusakanName: kerusakan.kerusakanName,
                perbaikan: kerusakan.perbaikan,
            }
            })
            .then(function (response) {
                kerusakanResponse = response.data
                // console.log(kerusakanResponse);
            })
            .catch(function (error) {
                kerusakanResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(kerusakanResponse);

            })
            return kerusakanResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}
export async function KerusakanDeleteApi(id: number): Promise<KerusakanTypeResponse>{
    try {
        let kerusakanResponse: KerusakanTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager(`/api/kerusakan/${id}`,{
            method:"DELETE",
            headers:{
                'content-type':"application/json"
            }
            
            })
            .then(function (response) {
                kerusakanResponse = response.data
                // console.log(kerusakanResponse);
            })
            .catch(function (error) {
                kerusakanResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(kerusakanResponse);

            })
            return kerusakanResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}