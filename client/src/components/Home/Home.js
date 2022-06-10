import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import './Home.css'

import LoginForm from '../Form/LoginForm'
import loginService from '../../services/login'

export default function Home() {
    const [loginMessage, setLoginMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [user, setUser] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            navigate('/acciones')
        }
    }, [])

    const handleLogin = async (username, password) => {
        try {
            const user = await loginService.login({
                username,
                password
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            setUser(user)
            setLoginMessage('Ingresando...')
            setTimeout(() => {
                navigate('/acciones')
            }, 1500)
        } catch (e) {
            setErrorMessage(
                'Credenciales incorrectas, porfavor verifica el nombre de usuario y/o contraseña'
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    return (
        <div className='app'>
            <LoginForm handleLogin={handleLogin}>
                <p>{loginMessage}</p>
                <p>{errorMessage}</p>
            </LoginForm>
        </div>
    )
}
