import axios from 'axios'

export const baseURL = 'http://localhost:3001/'

const login = async credentials => {
    const { data } = await axios.post(`${baseURL}login`, credentials)
    return data
}

export default { login }
