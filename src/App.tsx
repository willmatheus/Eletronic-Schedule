import {Routes, Route, NavLink} from 'react-router-dom'
import side_bar_pages from './side_bar_pages'
import Tasks from './pages/Tasks/Tasks'
import EventManager from './pages/Event_Activity/EventManager'
import './App.css'
import WeeklySchedule from './pages/WeeklySchedule/WeeklySchedule'
import MeetingsManager from './pages/Meetings/MeetingsManager'

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
            <Route path='/eventos' element = {<EventManager/>}></Route>
            <Route path='/reunioes' element = {<MeetingsManager/>}></Route>
            <Route path='/' element = {<WeeklySchedule/>}></Route>
          </Routes>
        </div>
    </div>
  )
}

export default App
