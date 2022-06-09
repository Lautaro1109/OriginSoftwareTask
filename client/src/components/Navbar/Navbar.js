import { useEffect, useState } from 'react'

import { Stack, AppBar, Toolbar, Typography } from '@mui/material'

export default function Navbar() {
    const [user, setUser] = useState('')

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')

        const { name } = JSON.parse(loggedUser)

        setUser(name)
    }, [])

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
                        {user}
                    </Typography>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}
