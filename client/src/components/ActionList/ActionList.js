import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './ActionList.css'

import DeleteIcon from '@mui/icons-material/Delete'
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

import { getSymbolData, addSymbol, getSymbols } from '../../services/symbol'

export default function ActionList() {
    const [optionsData, setOptionsData] = useState([])
    const [symbolData, setSymbolData] = useState('')
    const [symbolList, setSymbolList] = useState([])
    const [user, setUser] = useState('')

    const handleSymbolChange = (event, value) => {
        if (value) setSymbolData(value.label)
    }

    const handleSymbolAdd = async () => {
        addSymbol(symbolData, user.id).then(res => {
            setSymbolList([...symbolList, res])
        })
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)

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

    return (
        <div className='action-container'>
            <div className='card'>
                <div className='select'>
                    <span>Simbolo</span>
                    <Autocomplete
                        disablePortal
                        id='combo-box-demo'
                        options={optionsData}
                        sx={{ width: 300 }}
                        renderInput={params => (
                            <TextField {...params} label='Simbolo' />
                        )}
                        onChange={handleSymbolChange}
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
                                symbolList.map(symbol => (
                                    <>
                                        <TableRow key={symbol.id}>
                                            <TableCell key={symbol.id}>
                                                {symbol.Symbol}
                                            </TableCell>
                                            <TableCell key={symbol.id}>
                                                {symbol.Name}
                                            </TableCell>
                                            <TableCell key={symbol.id}>
                                                {symbol.Currency}
                                            </TableCell>
                                            <TableCell key={symbol.id}>
                                                <IconButton
                                                    key={symbol.id}
                                                    onClick={() =>
                                                        console.log('test')
                                                    }
                                                >
                                                    <DeleteIcon
                                                        color='primary'
                                                        key={symbol.id}
                                                    ></DeleteIcon>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
