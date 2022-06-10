export const getDetailsData = async () => {
    const response = await axios.get(`${REACT_APP_API_DETAILS_URL}`)

    return process.env.API_KEY
}
