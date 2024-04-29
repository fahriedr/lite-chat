import { fetchApi } from "@/lib/helper"

interface MessageProps {
    data: {
        userId: string,
        message: string
    }
}


export const getConversationsApi = async () => {

    const res  = await fetchApi({
        url: '/api/conversations',
        method: 'GET'
    })

    return res

}

export const getMessagesApi = async (receiverId: string) => {
    
    const res = await fetchApi({
        url: `/api/messages/list/${receiverId}`,
        method: 'GET'
    })

    return res
}

export const sendMessageApi = async (props: MessageProps) => {

    const res = await fetchApi({
        url: `/api/messages/send`,
        method: 'POST',
        data: props.data
    })

    return res
}