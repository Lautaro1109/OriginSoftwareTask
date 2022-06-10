import Navbar from '../Navbar/Navbar'

import './Detail.css'
import '../ActionList/ActionList.css'

import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Detail() {
    const { id } = useParams()

    useEffect(() => {
        console.log(id)
    })

    return (
        <div className='detail-container'>
            <Navbar></Navbar>
            <div className='detail-content'>
                <div className='card'>
                    <div className='detail-header-title'>
                        <h1>Detalle de Acción</h1>
                    </div>
                    <div className='detail-action'>
                        <div className='detail-action-data'>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label='Tiempo Real'
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label='Historico'
                                />
                            </FormGroup>
                        </div>
                        <div className='detail-action-select'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
