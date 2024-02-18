import React from 'react'
import styled from 'styled-components'
import { TaskProps } from '../types/tasks'

const Card = styled.div`
    background-color: white;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
`

const CardHead = styled.div`
    display: flex;
`

const CardData = styled.h3`
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
            case "Pendente":
                return "#C82B28"
            case "Concluído":
                return "#28C842"
            case "Em breve":
                return "#C82B28"
            default:
                return "#C82B28"
        }
    }

function Cards() {
  return (
    <>
            <Card>
                <CardHead>
                    <CardTitle>Estudar para a prova de redes</CardTitle>
                    <Status color='Concluído'>Concluído</Status>
                </CardHead>

                <CardData>4 de janeiro</CardData>

            </Card>
    </>
  )
}

export default Cards