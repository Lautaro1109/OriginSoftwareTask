import axios from 'axios'

export const getDetailsData = async (symbol, interval) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_DETAILS_URL}?symbol=${symbol}&interval=${interval}min&apikey=${process.env.REACT_APP_API_KEY}`
    )

    return response
}
export const getDetailsWithDate = async (
    symbol,
    interval,
    startDate,
    endDate
) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_DETAILS_URL}?symbol=${symbol}&interval=${interval}min&start_date=${startDate}&end_date=${endDate}&apikey=${process.env.REACT_APP_API_KEY}`
    )

    return response
}
