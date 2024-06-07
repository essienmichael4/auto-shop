import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import RequireAuth from './components/RequireAuth'
import Dashboard from './Pages/Dashboard/Dashboard'
import Garage from './Pages/Garage/Garage'
import Services from './Pages/Services/Services'
import Customers from './Pages/Customers/Customers'
import Employees from './Pages/Employees/Employees'

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
              <Route path="customers" element={<Customers/>} />
              <Route path="employees" element={<Employees/>} />
            </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
