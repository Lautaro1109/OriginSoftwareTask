import React, { useEffect, useState } from 'react'

import './ActionList.css'

import {
    Button,
    TextField,
    Autocomplete,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    IconButton
} from '@mui/material'

import {
    getSymbolData,
    addSymbol,
    getSymbols,
    setToken,
    deleteSymbol
} from '../../services/symbol'

import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'

export default function ActionList() {
    const [optionsData, setOptionsData] = useState([])
    const [symbolData, setSymbolData] = useState(null)
    const [symbolList, setSymbolList] = useState([])
    const [user, setUser] = useState('')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            setToken(user.token)
            getSymbols(user.id).then(data => {
                setSymbolList(data)
            })
        }
        getSymbolData().then(({ data }) => {
            const optionLabels = data.map(symbol => {
                return {
                    label: symbol.symbol
                }
            })
            setOptionsData(optionLabels)
        })
    }, [])

    const handleSymbolChange = (event, value) => {
        if (value) setSymbolData(value.label)
    }
    const handleSymbolAdd = async () => {
        const response = await addSymbol(symbolData, user.id)

        setSymbolList([...symbolList, response])

        getSymbols(user.id).then(data => {
            setSymbolList(data)
        })

        setSymbolData(null)
    }
    const handleSymbolDelete = id => {
        deleteSymbol(id)

        getSymbols(user.id).then(data => {
            setSymbolList(data)
        })
    }
    return (
        <div className='action-container'>
            <div className='card'>
                <div className='select'>
                    <span>Simbolo</span>
                    <Autocomplete
                        disablePortal
                        options={optionsData}
                        sx={{ width: 300 }}
                        renderInput={params => (
                            <TextField {...params} label='Simbolo' />
                        )}
                        onChange={handleSymbolChange}
                        value={symbolData}
                        isOptionEqualToValue={(option, value) => {
                            return option.label === value
                        }}
                    />
                    <Button variant='contained' onClick={handleSymbolAdd}>
                        Agregar Simbolo
                    </Button>
                </div>
                <div className='table'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Simbolo</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Moneda</TableCell>
                                <TableCell>Accion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {symbolList &&
                                symbolList.map((symbol, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Link
                                                    to={`/detalles/${symbol.Symbol}`}
                                                >
                                                    {symbol.Symbol}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{symbol.Name}</TableCell>
                                            <TableCell>
                                                {symbol.Currency}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={() =>
                                                        handleSymbolDelete(
                                                            symbol.Id
                                                        )
                                                    }
                                                >
                                                    <DeleteIcon color='primary'></DeleteIcon>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
