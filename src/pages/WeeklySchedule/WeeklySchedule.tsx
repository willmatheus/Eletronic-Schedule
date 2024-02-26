import React, { useState } from 'react'
import './style.css'
import styled from 'styled-components'
import Cards from '../../components/Cards'
import { TaskProps } from '../../types/tasks'

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
  `

function WeeklySchendule() {

  const listOfTasks = [{'titulo': 'Fazer a prova de MPS', 'status' : 'pendente',
'data': '4 de janeiro'}, {'titulo': 'Estudar para a prova de Redes', 'status' : 'pendente',
'data' : '30 de dezembro'}]

  const [tasks, setTasks] = useState<TaskProps | null>(null)

  return (
    <div className='container'>
      <div className='title'><h1>Agenda Semanal</h1></div>

      <AllActivitiesContainer>

        {/*Tarefas*/}
        <ActivityContainer>
          <p>Tarefas</p>
          <ul>
            {/*<Cards {...tasks}/>*/}
          </ul>
        </ActivityContainer>

        {/*Eventos*/}
        <ActivityContainer>
          <p>Eventos</p>
          <div className='list-container'>
            <ul>
              
            </ul>
          </div>
        </ActivityContainer>

        {/*Reuniões*/}
        <ActivityContainer>
          <p>Reuniões</p>
          <ul>
            {/*<Cards {...tasks}/>*/}
          </ul>
        </ActivityContainer>

      </AllActivitiesContainer>
    </div>
  )
}

export default WeeklySchendule