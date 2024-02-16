import {Routes, Route, NavLink} from 'react-router-dom'
import side_bar_pages from './side_bar_pages'
import AgendaSemanal from './pages/AgendaSemanal'
import Tarefas from './pages/Tarefas'
import Eventos from './pages/Eventos'
import Calendario from './pages/Calendario'
import Reunioes from './pages/Reunioes'
import './App.css'

function App() {

  return (
    <div className='App'>
        <Routes>
          <Route path='/' element = {<AgendaSemanal/>}></Route>
          <Route path='/tarefas' element = {<Tarefas/>}></Route>
          <Route path='/eventos' element = {<Eventos/>}></Route>
          <Route path='/reunioes' element = {<Reunioes/>}></Route>
          <Route path='/calendario' element = {<Calendario/>}></Route>
        </Routes>

        <div className='sidebar-container'>
          <ul className='nav-list'>
            {side_bar_pages.map((item, index) => {
              return(
                <li className='nav-item' key={index}>
                  <NavLink to={item.path} className={({isActive}) => ["nav-link", isActive ? "active" : null].join(" ")}>
                    <div className='nav-link-icon'>{item.icon}</div>
                    <div className='icon-text'>{item.title}</div>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
    </div>
  )
}

export default App
