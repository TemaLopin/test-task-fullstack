import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Tasks from './components/Tasks'
import Main from './pages'

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='*' element={<>Not found</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
