import { useState } from 'react'

import './LoginForm.css'

export default function LoginForm({ handleLogin, children }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        handleLogin(username, password)
    }
    const handleUsernameChange = value => {
        setUsername(value)
    }
    const handlePasswordChange = value => {
        setPassword(value)
    }

    return (
        <div className='login-form'>
            <div className='logo'>
                <img src='./acciones-logo.png' width='100px' alt='logo'></img>
            </div>
            <div>
                <h1>¡Visualiza tus acciones!</h1>
            </div>

            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label htmlFor='Username'>Nombre de usuario</label>
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        placeholder='Ingresar nombre de usuario'
                        onChange={({ target }) =>
                            handleUsernameChange(target.value)
                        }
                    />
                </div>
                <div>
                    <label htmlFor='Password'>Contraseña</label>
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        placeholder='Contraseña'
                        onChange={({ target }) =>
                            handlePasswordChange(target.value)
                        }
                    />
                </div>
                <button type='submit' className='form-btn'>
                    Ingresar
                </button>

                <p className='message'> {children} </p>
            </form>
        </div>
    )
}
