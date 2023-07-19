import React, { createContext, useEffect, useState } from "react";
import { ROLE, UserType } from "../type/user_type";
import { LoginApi, RegisterApi } from "../api/AuthApi";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { removeValue, storeData } from "../utils/LocalStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface props {
    children: JSX.Element
}
export type AuthContextProps = {
    isLoading: boolean
    isLoggedIn: boolean
    user: UserType,
    login: (email: string, password: string) => void
    register: (name: string, email: string, password: string) => void
    logOut: () => void
}
export const AuthContext = createContext({} as AuthContextProps);
export const AuthProvider = ({ children }: props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<UserType>({} as UserType)

    const emptyUser: UserType = {
        id: 0,
        name: "",
        email: "",
        role: ROLE.ADMIN
    }

    const login = async (email: string, password: string) => {
        setUser(emptyUser)

        setIsLoading(true)
        const response: UserType = await LoginApi(email, password)
        console.log({ response });
        setIsLoading(false)



        if (response.id !== 0) {
            setUser(response)
            storeData(response)
            setIsLoggedIn(true)
        } else {
            Toast.show({
                text1: 'Jasbi',
                text2: `${response.name} 👋`,
            });
        }
        setIsLoading(false)

    }
    const register = async (name: string, email: string, password: string) => {
        setUser(emptyUser)

        setIsLoading(true)
        const response: UserType = await RegisterApi(name, email, password)
        console.log({ response });
        setIsLoading(false)

        if (response.id !== 0) {
            setUser(response)
            storeData(response)
            setIsLoggedIn(true)
        } else {
            Toast.show({
                text1: 'Jasbi',
                text2: `${response.name} 👋`,
            });
        }
        setIsLoading(false)

    }


    const logOut = async () => {
        setIsLoading(true)
        setUser(emptyUser)
        setIsLoggedIn(false)
        await removeValue()
        setIsLoading(false)
    }
    const isLoggedInInit = async () => {
        try {
            setIsLoading(true)
            let user = await AsyncStorage.getItem('user')
            console.log({ user });

            if (user !== null) {
                setUser(JSON.parse(user!) as UserType)
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }

            setIsLoading(false)
        } catch (error) {
            console.log({ error });
        }
    }
    useEffect(() => {
        isLoggedInInit()
    }, [])
    return (
        <AuthContext.Provider value={{ isLoading: isLoading, user: user, isLoggedIn: isLoggedIn, login: login, register: register, logOut: logOut }}>
            {children}
        </AuthContext.Provider>

    )
}
