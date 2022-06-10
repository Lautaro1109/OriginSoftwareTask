import Navbar from '../Navbar/Navbar'

import './Detail.css'
import '../ActionList/ActionList.css'

import {
    FormGroup,
    FormControlLabel,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    TextField,
    Radio,
    RadioGroup,
    Button
} from '@mui/material'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import { getSymbols } from '../../services/symbol'
import { getDetailsData, getDetailsWithDate } from '../../services/detail'

import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import Chart from '../Chart/Chart'

export default function Detail() {
    const { id } = useParams()
    const { state } = useLocation()
    const navigate = useNavigate()

    const [actionName, setActionName] = useState('')
    const [message, setMessage] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [isDisabled, setIsDisabled] = useState(true)
    const [timeInterval, setTimeInterval] = useState(0)
    const [type, setType] = useState('Realtime')
    const [chartData, setChartData] = useState([])
    const [seeChart, setSeeChart] = useState(false)

    useEffect(() => {
        setActionName(`${id} - ${state.Name} - ${state.Currency}`)
    })

    const handleTimeChange = () => {
        setIsDisabled(true)
        setType('Realtime')
        setSeeChart(false)
    }
    const handleHistoryChange = () => {
        setIsDisabled(false)
        setType('Historical')
        setSeeChart(false)
    }
    const handleStartDate = date => {
        const dateFormatted = date.toISOString().split('T')[0]
        const timeFormatted = date.toISOString().split('T')[1].split('.')[0]
        setStartDate(dateFormatted + ' ' + timeFormatted)
    }

    const handleEndDate = date => {
        const dateFormatted = date.toISOString().split('T')[0]
        const timeFormatted = date.toISOString().split('T')[1].split('.')[0]
        setEndDate(dateFormatted + ' ' + timeFormatted)
    }

    const handleTimeInterval = ({ target }) => {
        setTimeInterval(target.value)
    }

    const handleChart = () => {
        if (timeInterval) {
            if (type === 'Realtime') {
                getDetailsData(id, timeInterval).then(({ data }) => {
                    setChartData(data.values)
                    setSeeChart(true)
                })
            } else {
                getDetailsWithDate(id, timeInterval, startDate, endDate).then(
                    ({ data }) => {
                        setChartData(data.values)
                        setSeeChart(true)
                    }
                )
            }
        } else {
            setMessage('Porfavor selecciona un intervalo de tiempo')

            setTimeout(() => {
                setMessage('')
            }, 2500)
        }
    }

    return (
        <div className='detail-container'>
            <Navbar></Navbar>
            <div className='detail-content'>
                <div className='card'>
                    <Button
                        className='btn-back'
                        variant='outlined'
                        onClick={() => {
                            setActionName('')
                            navigate('/')
                        }}
                    >
                        {'<'} Volver
                    </Button>
                    <div className='detail-header-title'>
                        <h1>{actionName}</h1>
                    </div>
                    <div className='detail-action'>
                        <div className='detail-action-data'>
                            <span className='detail-action-op'>Opciones</span>
                            <FormGroup>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby='demo-radio-buttons-group-label'
                                        defaultValue='Tiempo Real'
                                        name='radio-buttons-group'
                                    >
                                        <FormControlLabel
                                            control={<Radio />}
                                            label='Tiempo Real'
                                            value={'Tiempo Real'}
                                            onChange={handleTimeChange}
                                        />
                                        <FormControlLabel
                                            control={<Radio />}
                                            label='Historico'
                                            value={'Historico'}
                                            onChange={handleHistoryChange}
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <span className='first-date'>
                                        Fecha de inicio
                                    </span>
                                    <div className='date-container'>
                                        <DateTimePicker
                                            label='Basic example'
                                            value={startDate}
                                            onChange={newValue => {
                                                handleStartDate(newValue)
                                            }}
                                            renderInput={params => (
                                                <TextField {...params} />
                                            )}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                    <span className='second-date'>
                                        {' '}
                                        Fecha de fin
                                    </span>
                                    <div className='date-container'>
                                        <DateTimePicker
                                            label='Basic example'
                                            value={endDate}
                                            onChange={newValue => {
                                                handleEndDate(newValue)
                                            }}
                                            renderInput={params => (
                                                <TextField {...params} />
                                            )}
                                            disabled={isDisabled}
                                        />
                                    </div>
                                </LocalizationProvider>
                                <div className='select-c'>
                                    <span className='select-label'>
                                        Intervalo
                                    </span>
                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel id='demo-simple-select-label'>
                                                Intervalo
                                            </InputLabel>
                                            <Select
                                                label='Intervalo'
                                                onChange={handleTimeInterval}
                                                value={timeInterval}
                                            >
                                                <MenuItem value={1}>
                                                    1 minuto
                                                </MenuItem>
                                                <MenuItem value={5}>
                                                    5 minutos
                                                </MenuItem>
                                                <MenuItem value={15}>
                                                    15 minutos
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <button
                                    type='button'
                                    className='form-btn'
                                    onClick={handleChart}
                                >
                                    Graficar
                                </button>
                            </FormGroup>
                        </div>
                        <div className='detail-action-select'>
                            {chartData && seeChart && (
                                <>
                                    <Chart Symbol={id} data={chartData}></Chart>
                                </>
                            )}
                        </div>
                    </div>
                    {message && <p className='alert-message'>{message}</p>}
                </div>
            </div>
        </div>
    )
}
