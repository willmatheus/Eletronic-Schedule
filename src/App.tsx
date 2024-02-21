import {Routes, Route, NavLink} from 'react-router-dom'
import side_bar_pages from './side_bar_pages'
import Tarefas from './pages/Tasks/Tarefas'
import Eventos from './pages/Eventos'
import Calendario from './pages/Calendario'
import Reunioes from './pages/Reunioes'
import './App.css'

function App() {
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
            <Route path='/tarefas' element = {<Tarefas/>}></Route>
            <Route path='/eventos' element = {<Eventos/>}></Route>
            <Route path='/reunioes' element = {<Reunioes/>}></Route>
            <Route path='/' element = {<Calendario/>}></Route>
          </Routes>
        </div>
    </div>
  )
}

export default App
