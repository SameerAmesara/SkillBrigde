import axios from "axios"
import { ConversationModel } from "../../models/message.model"
import { UserDetails } from "../../models/UserDetatils.model"


const BASE_URL = import.meta.env.VITE_BASE_URL
const MESSAGE_URL = `${BASE_URL}/message`
const userId = sessionStorage.getItem("userId") ?? ""

export const sendMessage = async (receiverId: string, message: string) => {
    const url = `${MESSAGE_URL}/${receiverId}`
    return await axios.post(url, { "message": message }, { headers: { "userId": userId } })
}

export const getMessages = async (receiverId: string) => {
    const url = `${MESSAGE_URL}/${receiverId}`
    return await axios.get(url, { headers: { "userId": userId } })
}

export const getConversations = async () => {
    const url = `${BASE_URL}/networking/userconnections`
    const userConnections = (await axios.get(url, { params: { "uid": userId } })).data.myConnections as string[]
    
    let conversations: ConversationModel[] = []
    userConnections.forEach(async connectionId => {
        const userDetails = (await axios.get<UserDetails>(`${BASE_URL}/userDetails/${connectionId}`)).data
        conversations.push({
            receiverId: connectionId,
            recieverName: userDetails.firstName + " " + userDetails.lastName
        })
    })
    return conversations
}