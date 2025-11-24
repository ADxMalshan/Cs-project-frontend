import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/homePage'

function App() {

  return (
    <BrowserRouter >
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes path="/*">
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
