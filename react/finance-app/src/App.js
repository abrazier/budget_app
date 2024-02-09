import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Transactions from './pages/Transactions'
import Graphs from './pages/Graphs'
import Budgets from './pages/Budgets'
import NoPage from './pages/NoPage'


export default function App(){
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/transactions" element={<Transactions />}></Route>
          <Route path="/graphs" element={<Graphs />}></Route>
          <Route path="/budgets" element={<Budgets />}></Route>
          <Route path="*" element={<NoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}