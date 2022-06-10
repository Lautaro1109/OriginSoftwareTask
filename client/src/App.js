import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './components/Home/Home'
import Actions from './components/Actions/Actions'
import Detail from './components/Detail/Detail'

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/acciones' exact element={<Actions />} />
                <Route path='/detalles/:id' exact element={<Detail />} />
            </Routes>
        </Router>
    )
}

export default App
