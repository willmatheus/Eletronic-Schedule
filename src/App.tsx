import {Routes, Route, NavLink} from 'react-router-dom'
import side_bar_pages from './side_bar_pages'
import AgendaSemanal from './pages/AgendaSemanal'
import Tasks from './pages/Tasks/Tasks'
import Events from './pages/Events/Events'
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
            <Route path='/' element = {<AgendaSemanal/>}></Route>
            <Route path='/tarefas' element = {<Tasks/>}></Route>
            <Route path='/eventos' element = {<Events/>}></Route>
            <Route path='/reunioes' element = {<Reunioes/>}></Route>
            <Route path='/calendario' element = {<Calendario/>}></Route>
          </Routes>
        </div>
    </div>
  )
}

export default App
