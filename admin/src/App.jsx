import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar_temp from './components/Sidebar/Sidebar_temp'
import Add from './components/pages/Add/Add'
import List from './components/pages/List/List'
import Orders from './components/pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const url = "http://localhost:4000"

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        < Sidebar_temp />
        <Routes>
          <Route path="/add" element={<Add url={url}/>} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App