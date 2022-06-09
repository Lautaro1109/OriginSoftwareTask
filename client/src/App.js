import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './components/Home/Home'
import Actions from './components/Actions/Actions'

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/acciones' exact element={<Actions />} />
            </Routes>
        </Router>
    )
}

export default App
