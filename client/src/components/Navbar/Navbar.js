import { useEffect, useState } from 'react'

import { Stack, AppBar, Toolbar, Typography, Button } from '@mui/material'

import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const [user, setUser] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')

        const { name } = JSON.parse(loggedUser)

        setUser(name)
    }, [])

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')

        setTimeout(() => {
            navigate('/')
        }, 1500)
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Mis Acciones
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        {user.toUpperCase()}
                    </Typography>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Typography>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
