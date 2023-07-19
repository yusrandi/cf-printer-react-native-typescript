

import { EvidenceTypeResponse } from '../type/evidence_type'
import { ROLE, UserType } from '../type/user_type'
import ApiManager from './ApiManager'
import axios from 'axios'

export async function LoginApi(email: string, password: string): Promise<UserType>{

    console.log({email});
    console.log({password});
    
    try {
        let userResponse: UserType = {
            id: 0,
            email: '',
            name: '',
            role: ROLE.ADMIN
        }

        const result = await ApiManager("/api/login",{
            method:"POST",
            headers:{
                'content-type':"application/json"
            },
            data: {
                email: email,
                password: password
            }
            })
            .then(function (response) {
                userResponse = response.data
                // console.log({response});
            })
            .catch(function (error) {
                userResponse =  {
                    id: 0,
                    email: 'catch',
                    name: error,
                    role: ROLE.ADMIN
                }
                // console.log(error);

            })
            return userResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            id: 0,
            email: 'error',
            name: error,
            role: ROLE.ADMIN
        }
    }
}
export async function RegisterApi(name: string, email: string, password: string): Promise<UserType>{

    console.log({email});
    console.log({password});
    
    try {
        let userResponse: UserType = {
            id: 0,
            email: '',
            name: '',
            role: ROLE.USER
        }

        const result = await ApiManager("/api/register",{
            method:"POST",
            headers:{
                'content-type':"application/json"
            },
            data: {
                name: name,
                email: email,
                password: password,
                role: ROLE.USER
            }
            })
            .then(function (response) {
                userResponse = response.data
                // console.log({response});
            })
            .catch(function (error) {
                userResponse =  {
                    id: 0,
                    email: 'catch',
                    name: error,
                    role: ROLE.USER
                }
                // console.log(error);

            })
            return userResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            id: 0,
            email: 'error',
            name: error,
            role: ROLE.USER
        }
    }
}