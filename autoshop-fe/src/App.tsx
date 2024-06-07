import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import RequireAuth from './components/RequireAuth'
import Dashboard from './Pages/Dashboard/Dashboard'
import Garage from './Pages/Garage/Garage'
import Services from './Pages/Services/Services'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<RequireAuth />}>
            <Route path='autoshop'>
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="garage" element={<Garage/>} />
              <Route path="services" element={<Services/>} />
            </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
