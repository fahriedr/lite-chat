import { fetchApi } from "@/lib/helper"


export const conversationsApi = async () => {

    const res  = await fetchApi({
        url: '/api/conversations',
        method: 'GET'
    })

    return res

}

export const messagesApi = async (receiverId: string) => {
    
    const res = await fetchApi({
        url: `/api/messages/list/${receiverId}`,
        method: 'GET'
    })

    return res
}