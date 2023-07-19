import { UserType, UserTypeResponse } from '../type/user_type'
import ApiManager from './ApiManager'
import axios from 'axios'

export async function UsersApi(): Promise<UserTypeResponse>{
    try {
        let userResponse: UserTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager('/api/user')
            .then(function (response) {
                userResponse = response.data
                // console.log(userResponse);
            })
            .catch(function (error) {
                userResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(userResponse);

            })
            return userResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}
export async function UserUpdateApi(user: UserType, password: string): Promise<UserTypeResponse>{
    try {
        let userResponse: UserTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager(`/api/user/${user.id}`,
        {
            method:"PATCH",
            headers:{
                'content-type':"application/json"
            },
            data: {
                name: user.name,
                email: user.email,
                password: password,
            }
        })
            .then(function (response) {
                userResponse = response.data
                // console.log(userResponse);
            })
            .catch(function (error) {
                userResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(userResponse);

            })
            return userResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}
export async function UserDeleteApi(id: number): Promise<UserTypeResponse>{
    try {
        let userResponse: UserTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager(`/api/user/${id}`,
        {
            method:"DELETE",
            headers:{
                'content-type':"application/json"
            }
        })
            .then(function (response) {
                userResponse = response.data
                // console.log(userResponse);
            })
            .catch(function (error) {
                userResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(userResponse);

            })
            return userResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}
