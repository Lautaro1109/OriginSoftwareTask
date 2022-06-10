import axios from 'axios'

let token = null

export const setToken = newToken => {
    token = `Bearer ${newToken}`
}

export const getSymbolData = () => {
    return axios
        .get(process.env.REACT_APP_SYMBOLS_URL)
        .then(res => res.data)
        .catch(err => err)
}

export const addSymbol = async (symbolData, userId) => {
    const config = {
        headers: {
            Authorization: token
        }
    }

    const { data } = await axios.get(
        `https://api.twelvedata.com/stocks?symbol=${symbolData}&source=docs`
    )

    const symbol = data.data[0]

    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}symbol`,
        {
            Symbol: symbol.symbol,
            Name: symbol.name,
            Currency: symbol.currency,
            userId
        },
        config
    )

    return {
        Symbol: response.data[0],
        Name: response.data[1],
        Currency: response.data[2],
        Id: response.data[3]
    }
}

export const getSymbols = async userId => {
    const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}symbol/symbols`,
        { userId }
    )

    return data
}

export const deleteSymbol = async id => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    const { data } = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}symbol/${id}`,
        config
    )

    return data
}
