import { fetchApi } from "@/lib/helper"
import { User } from "../../types/index"


export const getProfileApi = async () => {
    const res  = await fetchApi({
        url: '/api/profile',
        method: 'GET'
    })

    const data: User = res?.data.data

    return data
}