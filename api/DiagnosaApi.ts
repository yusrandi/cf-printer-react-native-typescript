import ApiManager from './ApiManager'
import axios from 'axios'

export async function DiagnosaCreateApi(userId: number, kerusakanId: number, nilai: number): Promise<string>{
    try {
       

        const result = await ApiManager(`/api/diagnosa`,
        {
            method:"POST",
            headers:{
                'content-type':"application/json"
            },
            data: {
                kerusakanId: kerusakanId,
                userId: userId,
                nilai: nilai,
            }
        })
            .then(function (response) {
                console.log({response});
            })
            .catch(function (error) {
                console.log({error});
                

            })
            return "success"
    } catch (error: any) {
    // console.log(`error ${error}`);
        return error
    }
}

