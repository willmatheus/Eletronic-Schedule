import React, { useEffect, useState } from 'react'
import './style.css'
import styled from 'styled-components'
import {Card, CardData, CardHead, CardTitle, Status} from '../../components/Cards'
import { TaskProps } from '../../types/tasks'
import { api } from '../../services/api'
import { MeetingsProps } from '../../types/meetings'
import { EventsProps } from '../../types/events'

const AllActivitiesContainer = styled.div`
    padding-top: 40px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 0px;
  `
  
const ActivityContainer = styled.div`
    background-color: #5F22D9;
    padding: 10px;
    min-height: 170px;
    max-height: 350px;
    overflow: auto;
    margin-bottom: 20px;
    padding-bottom: 10px;
  `

function WeeklySchendule() {

  const [allTasks, setAllTasks] = useState<TaskProps[]>([])
  const [weeklyTasks, setWeeklyTasks] = useState<TaskProps[]>([])

  const [allEvents, setAllEvents] = useState<EventsProps[]>([])
  const [weeklyEvents, setWeeklyEvents] = useState<EventsProps[]>([])

  const [allMeetings, setAllMeetings] = useState<MeetingsProps[]>([])
  const [weeklyMeetings, setWeeklyMeetings] = useState<MeetingsProps[]>([])

  useEffect(() => {
    loadTasks()
    if (allTasks.length > 0) {
      filterTasksByWeekday();
    }
    loadEvents()
    if (allEvents.length > 0) {
      filterEventsByWeekday();
    }
    loadMeetings()
    if (allEvents.length > 0) {
      filterMeetingsByWeekday();
    }
  }, [allTasks, allEvents, allMeetings]);

  async function loadTasks() {
    const response = await api.get('/tarefas');
    setAllTasks(response.data);
    filterTasksByWeekday()
  }

  async function loadEvents() {
    const response = await api.get('/eventos');
    setAllEvents(response.data);
    filterEventsByWeekday()
  }

  async function loadMeetings() {
    const response = await api.get('/reunioes');
    setAllMeetings(response.data);
    filterMeetingsByWeekday()
  }

  function filterTasksByWeekday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar a data de hoje para meia-noite
  
    // Encontrar a data de início da semana
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
  
    // Encontrar o fim da semana
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Fim da semana (6 dias após o início)
  
    const filteredTasks = allTasks.filter((task: TaskProps) => {
      const [dia, mes, ano] = task.data.split('/').map(Number); // Ajuste para o formato "dd/mm/aaaa"
      const taskDate = new Date(ano, mes - 1, dia); // Os meses são indexados a partir de 0
      taskDate.setHours(0, 0, 0, 0); // Normalizar a hora da data da tarefa para meia-noite
  
      // Verificar se a data da tarefa está entre hoje e o fim da semana
      return taskDate >= today && taskDate <= endOfWeek;
    });
  
    setWeeklyTasks(filteredTasks);
  }

  function filterEventsByWeekday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar a data de hoje para meia-noite
  
    // Encontrar a data de início da semana
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
  
    // Encontrar o fim da semana
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Fim da semana (6 dias após o início)
  
    const filteredEvents = allEvents.filter((events: EventsProps) => {
      const [dia, mes, ano] = events.data.split('/').map(Number); // Ajuste para o formato "dd/mm/aaaa"
      const eventDate = new Date(ano, mes - 1, dia); // Os meses são indexados a partir de 0
      eventDate.setHours(0, 0, 0, 0); // Normalizar a hora da data da tarefa para meia-noite
  
      // Verificar se a data da tarefa está entre hoje e o fim da semana
      return eventDate >= today && eventDate <= endOfWeek;
    });
  
    setWeeklyEvents(filteredEvents);
  }

  function filterMeetingsByWeekday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar a data de hoje para meia-noite
  
    // Encontrar a data de início da semana
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
  
    // Encontrar o fim da semana
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Fim da semana (6 dias após o início)
  
    const filteredMeetings = allMeetings.filter((meetings: MeetingsProps) => {
      const [dia, mes, ano] = meetings.data.split('/').map(Number); // Ajuste para o formato "dd/mm/aaaa"
      const meetingDate = new Date(ano, mes - 1, dia); // Os meses são indexados a partir de 0
      meetingDate.setHours(0, 0, 0, 0); // Normalizar a hora da data da tarefa para meia-noite
  
      // Verificar se a data da tarefa está entre hoje e o fim da semana
      return meetingDate >= today && meetingDate <= endOfWeek;
    });
  
    setWeeklyMeetings(filteredMeetings);
  }

  return (
    <div className='container'>
      <div className='title'><h1>Agenda Semanal</h1></div>

      <AllActivitiesContainer>

        {/*Tarefas*/}
        <ActivityContainer>
          <p>Tarefas</p>
          <div className='activity-list-container'>
              {weeklyTasks.length>0?
                weeklyTasks.map((task : TaskProps)=>(
                    <div key={task.id}>
                        <Card>
                            <CardHead>
                                <CardTitle>{task.titulo}</CardTitle>
                                <Status color={task.status}>{task.status}</Status>
                            </CardHead>
                            <CardData>{task.data}</CardData>

                        </Card>
                    </div>
                )) : (
                  <p className='activity-empty'>Não há tarefas para a semana</p>
                )}
          </div>
        </ActivityContainer>

        {/*Eventos*/}
        <ActivityContainer>
          <p>Eventos</p>
          <div className='activity-list-container'>
              {weeklyEvents.length>0?
                  weeklyEvents.map((event : EventsProps)=>(
                    <div key={event.id}>
                        <Card>
                            <CardHead>
                                <CardTitle>{event.titulo}</CardTitle>
                            </CardHead>
                            <CardData>{event.data}</CardData>

                        </Card>
                    </div>
                )) : (
                  <p className='activity-empty'>Não há eventos para a semana</p>
                )}
          </div>
        </ActivityContainer>

        {/*Reuniões*/}
        <ActivityContainer>
          <p>Reuniões</p>
          <div className='activity-list-container'>
              {weeklyMeetings.length>0?
                  weeklyMeetings.map((meet : MeetingsProps)=>(
                    <div key={meet.id}>
                        <Card>
                            <CardHead>
                                <CardTitle>{meet.titulo}</CardTitle>
                            </CardHead>
                            <CardData>{meet.data}</CardData>

                        </Card>
                    </div>
                )) : (
                  <p className='activity-empty'>Não há reuniões para a semana</p>
                )}
          </div>
        </ActivityContainer>

      </AllActivitiesContainer>
    </div>
  )
}

export default WeeklySchendule