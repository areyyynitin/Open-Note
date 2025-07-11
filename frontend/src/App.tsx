import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { Navigate } from 'react-router-dom'
import { SignIn } from './pages/Signin'
import { Signup } from './pages/Signup'
import SharePage from './components/SharePage'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/signup" />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/share/:hash' element={<SharePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
