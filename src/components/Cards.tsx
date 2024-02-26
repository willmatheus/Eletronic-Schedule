import React, { useState } from 'react'
import styled from 'styled-components'
import ShowTask from '../pages/Tasks/ShowTask'
import ShowEvent from '../pages/Event_Activity/ShowEvent';
import ShowMeeting from '../pages/Meetings/ShowMeeting';
import { TaskProps } from '../types/tasks'; 
import {useModalTask} from '../context/modalTask'

import { Modal} from '@mui/joy';

export const Card = styled.button`
    background-color: white;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    outline: none;
    border: none;
    outline: none;
    border: none;
    width: 100%;
    cursor: pointer;
    margin-bottom: 10px;
`

export const CardHead = styled.div`
    display: flex;
`

export const CardData = styled.h3`
    float: left;
    font-size: 12px;
    color: #6B6B6B;
    margin-top: 10px;
`

export const Status= styled.div`
    font-size: 12px;
    float: right;
    margin-left: auto; 
    margin-right: 0;
    color: white;
    background-color: ${({color}) => handleColorStatus(color)};
    padding-left: 15px;
    padding-top: 5px;
    padding-right: 15px;
`

export const CardTitle = styled.h2`
    font-size: 20px;
    color: black;
    font-weight: normal;
`

const handleColorStatus: (color : string | any) => string =
    function(color : string | any){
        switch(color){
            case "pendente":
                return "#C82B28"
            case "concluido":
                return "#28C842"
            default:
                return "#C82B28"
        }
    }


type CardsProps = {
    activity_name : string;
    activities: TaskProps[];
}

function Cards({activity_name, activities} : CardsProps) {
    const [currentActivity, setCurrentActivity] = useState<TaskProps>()
    const { openTask, handleOpenTask, handleCloseTask } = useModalTask();
    
    function handleOpen (activityItem : TaskProps) {
        setCurrentActivity(activityItem);
        handleOpenTask()
    } 
    return (
            <div>
            {activities.map((activity : TaskProps)=>(
                <div key={activity.id}>
                    <Card onClick={() => handleOpen(activity)}>
                        <CardHead>
                            <CardTitle>{activity.titulo}</CardTitle>
                            <Status color={activity.status}>{activity.status}</Status>
                        </CardHead>
                        <CardData>{activity.data}</CardData>

                    </Card>
                </div>
            ))}
                <Modal
                open={openTask}
                onClose={handleCloseTask}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <ShowTask task={currentActivity}/>
                </Modal>    
            </div>
    )
}

export default Cards