import {Routes, Route, NavLink} from 'react-router-dom'
import side_bar_pages from './side_bar_pages'
import AgendaSemanal from './pages/AgendaSemanal'
import Tarefas from './pages/Tasks/Tarefas'
import Eventos from './pages/Eventos'
import Calendario from './pages/Calendario'
import Reunioes from './pages/Reunioes'
import { api } from './services/api'
import { useEffect, useState } from 'react'
import { TaskProps } from './types/tasks'
import './App.css'

function App() {

  const [tasks, setTasks] = useState<TaskProps[]>([])

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get('/tarefas');
    setTasks(response.data);
  }

  return (
    <div className='App'>
        <div className='sidebar-container'>
          <ul className='nav-list'>
            {side_bar_pages.map((item, index) => {
              return(
                <li className='nav-item' key={index}>
                  <NavLink to={item.path} className="nav-link">
                      <div className='nav-link-icon'>{item.icon}</div>
                      <div className='icon-text'>{item.title}</div>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='content'>
          <Routes>
            <Route path='/' element = {<AgendaSemanal/>}></Route>
            <Route path='/tarefas' element = {<Tarefas/>}></Route>
            <Route path='/eventos' element = {<Eventos/>}></Route>
            <Route path='/reunioes' element = {<Reunioes/>}></Route>
            <Route path='/calendario' element = {<Calendario/>}></Route>
          </Routes>
        </div>
    </div>
  )
}

export default App
