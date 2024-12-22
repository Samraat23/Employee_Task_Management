import './App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Tasklist from './Component/Tasklist'
import TaskAdd from './Component/TaskAdd'
import Edittask from './Component/Edittask'



function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Tasklist/>}/>
        <Route path='Create/task' element={<TaskAdd/>}/>
        <Route path='edit/task/:id' element={<Edittask/>} />

      
        
      </Routes>
    </BrowserRouter>
    </>
  )
}


export default App
