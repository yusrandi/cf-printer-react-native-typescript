import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserCFType{
    key: number
    value: number
}
interface UserCFstate{
    maps: UserCFType[]
}
const initialState: UserCFstate = {
    maps: []
}

export const UserCFSLice = createSlice({
    name: "userCF",
    initialState: initialState,
    reducers: {
        clearItem: (state, action: PayloadAction)  => {
            state.maps.slice()
        },
        addItem: (state, action: PayloadAction<{key: number, value: number}>)  => {
            if (!state.maps.find(data => data.key === action.payload.key)) {
                state.maps.push({
                    key: action.payload.key, value:action.payload.value
                })
            }
            
        },
    }
})

export default UserCFSLice.reducer
export const {addItem, clearItem}  = UserCFSLice.actions