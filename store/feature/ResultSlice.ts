import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ResultCFType{
    id: number,
    kerusakanCode: string
    kerusakanName: string
    perbaikan: string
    nilai: number
}
interface ResultState{
    results : ResultCFType[]
}
const initialState: ResultState = {
    results: []
}

export const ResultSLice = createSlice({
    name: "results",
    initialState: initialState,
    reducers: {
        clearResultItem: (state, action: PayloadAction)  => {
            state.results.slice()
        },
        addResultItem: (state, action: PayloadAction<{
            id: number, kerusakanCode: string, kerusakanName: string, nilai: number, perbaikan: string
        }>)  => {
            if (!state.results.find(data => data.id === action.payload.id)) {
                state.results.push({
                    id: action.payload.id,
                    kerusakanCode: action.payload.kerusakanCode,
                    kerusakanName: action.payload.kerusakanName,
                    perbaikan: action.payload.perbaikan,
                    nilai:action.payload.nilai
                })
            }
           
        },
    }
})

export default ResultSLice.reducer
export const {addResultItem, clearResultItem}  = ResultSLice.actions