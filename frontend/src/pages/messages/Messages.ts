import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL
const MESSAGE_URL = `${BASE_URL}/message`
const userId = sessionStorage.getItem("userId") ?? ""

export const sendMessage = async (receiverId: string, message: string) => {
    const url = `${MESSAGE_URL}/${receiverId}`
    return await axios.post(url, {"message": message}, {headers: {"userId": userId}})
}

export const getMessages = async (receiverId: string) => {
    const url = `${MESSAGE_URL}/${receiverId}`
    return await axios.get(url, {headers: {"userId": userId}})
}