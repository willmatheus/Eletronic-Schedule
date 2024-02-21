import React from 'react'
import styled from 'styled-components'
import ShowTask from '../pages/Tasks/ShowTask'
import { TaskProps } from '../types/tasks'; 

import { ModalClose, Modal} from '@mui/joy';

const Card = styled.button`
    background-color: white;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    outline: none;
    border: none;
    width: 100%;
    cursor: pointer;
`

const CardHead = styled.div`
    display: flex;
`

const CardData = styled.h3`
    float: left;
    font-size: 12px;
    color: #6B6B6B;
    margin-top: 10px;
`

const Status= styled.div`
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

const CardTitle = styled.h2`
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
            case "m breve":
                return "#C82B28"
            default:
                return "#C82B28"
        }
    }


type CardsProps = {
    activity_name : string;
    activity: TaskProps[];
}


function Cards({activity_name, activity} : CardsProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
        {activity.map((activity)=>(
            <div key={activity.id}>
            <Card onClick={handleOpen}>
                <CardHead>
                    <CardTitle>{activity.titulo}</CardTitle>
                    <Status color={activity.status}>{activity.status}</Status>
                </CardHead>
                <CardData>{activity.data}</CardData>

            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {handleOption(activity_name)}
            
            </Modal>
            </div>
        ))}
    </div>
    )
}

function handleOption (activity_name : string) : any{
    switch(activity_name){
        case 'task':
            return <ShowTask/>
        default:
            return <ShowTask/>
    }
}

export default Cards