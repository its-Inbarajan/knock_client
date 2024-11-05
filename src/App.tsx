import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { CreatelistView } from './pages/CreatelistView/CreatelistView'
import { Navbar } from './components/Navbar/Navbar'
import { ListView } from './pages/listView/ListView'
import { CreatelistView } from './pages/CreatelistView/CreatelistView'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path='/' element={<ListView />} />
          <Route path='/create-list' element={<CreatelistView />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
