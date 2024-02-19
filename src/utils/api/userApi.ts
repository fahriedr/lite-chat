import { fetchApi } from "@/lib/helper"


export const getProfileApi = async () => {
    const res  = await fetchApi({
        url: '/api/profile',
        method: 'GET'
    })

    return res
}