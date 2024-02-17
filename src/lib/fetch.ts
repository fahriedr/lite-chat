import axios from "axios"

interface PropsLogin {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data: {
        username: string,
        password: string
    } 
}

export const loginApi = async (props: PropsLogin) => {

    const res = await axios({
        method: props.method,
        url: props.url,
        data: props.data
    })

    return res

    console.log(res)

}