import {Routes, Route, NavLink} from 'react-router-dom'
import side_bar_pages from './side_bar_pages'
import Tasks from './pages/Tasks/Tasks'
import Events_Activity from './pages/Event_Activity/Events_Activity'
import CalendarManager from './pages/Calendar/CalendarManager'
import Meetings from './pages/Meetings/Meetings'
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
            <Route path='/tarefas' element = {<Tasks/>}></Route>
            <Route path='/eventos' element = {<Events_Activity/>}></Route>
            <Route path='/reunioes' element = {<Meetings/>}></Route>
            <Route path='/' element = {<CalendarManager/>}></Route>
          </Routes>
        </div>
    </div>
  )
}

export default App
