import axios from 'axios'

const login = async credentials => {
    const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}login`,
        credentials
    )
    return data
}

export default { login }
