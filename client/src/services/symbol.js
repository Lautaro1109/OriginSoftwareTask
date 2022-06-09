import axios from 'axios'
import { baseURL } from './login'

const symbolsDataUrl =
    'https://api.twelvedata.com/stocks?source=docs&exchange=NYSE'

export const getSymbolData = () => {
    return axios
        .get(symbolsDataUrl)
        .then(res => res.data)
        .catch(err => console.log(err))
}

export const addSymbol = async (symbolData, userId) => {
    const { data } = await axios.get(
        `https://api.twelvedata.com/stocks?symbol=${symbolData}&source=docs`
    )

    const symbol = data.data[0]

    const response = await axios.post(`${baseURL}symbol`, {
        Symbol: symbol.symbol,
        Name: symbol.name,
        Currency: symbol.currency,
        userId
    })

    return {
        Symbol: response.data[0],
        Name: response.data[1],
        Currency: response.data[2]
    }
}

export const getSymbols = async userId => {
    const { data } = await axios.post(`${baseURL}symbol/symbols`, { userId })

    return data
}
