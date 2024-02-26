import React, { useEffect, useRef, useState } from 'react'
import '../pagesStyles.css'
import './events_activity.css'
import {MdAdd, MdLocationOn, MdOutlinePeople } from "react-icons/md";
import styled from 'styled-components'
import FloatingButton from '../../components/FloatingButton';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { ptBR } from '@mui/x-date-pickers/locales';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs, { Dayjs } from 'dayjs';
import Cards from '../../components/Cards';
import { EventsProps } from '../../types/events';
import { useModalEvent } from '../../context/modalEvent';
import { api } from '../../services/api';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#5F22D9' },
      secondary: {main: '#51D6CA'}
    },
  },
  ptBR, 
);

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '700px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ButtonsBar = styled.div`
  display: flex;
  padding-top: 15px;
  float: right;
`

function Events_Activity() {
  const [events, setEvents] = useState<EventsProps[]>([])

  const tituloRef = useRef<HTMLInputElement | null> (null)
  const descricaoRef = useRef<HTMLTextAreaElement | null> (null)
  const dataRef = useRef<HTMLInputElement | null> (null)
  const horarioRef = useRef<HTMLInputElement | null> (null)
  const localRef = useRef<HTMLInputElement | null> (null)
  const nConvidadosRef = useRef<HTMLTextAreaElement | null> (null)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { openEvent, handleOpenEvent, handleCloseEvent } = useModalEvent();

  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  const [currentActivity, setCurrentActivity] = useState<EventsProps>()

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const response = await api.get('/eventos');
    setEvents(response.data);
  }

  return (
    <div className='container'>
      <div className='title'><h1>Eventos</h1></div>

      <div className='activities-container'>

        <div className='list-container'>
            <Cards activity_name='event' activities={[]}/>
        </div>

      </div>

      <FloatingButton onClick={handleOpen}><MdAdd size={30}/></FloatingButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Input aria-label="Demo input" placeholder="Título" />
          <Textarea aria-label="empty textarea" maxRows={7} placeholder="Adicione uma descrição…" color='primary'/>
          
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'TimeField']}>
                <MobileDatePicker label="Selecione uma data" slotProps={{ 
                  textField: {size: 'small', color: 'primary'}
                  }}/>
                
                <TimeField
                  label="Selecione um horário"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  slotProps={{ 
                    textField: {size: 'small', color: 'primary'}
                    }}
                />
                
              </DemoContainer>
            </LocalizationProvider>
            
          </ThemeProvider>

          <div className='location-container'>
            <MdLocationOn size={30} color='#5F22D9' className='location-icon'/>
            <input className='location-description' placeholder='Adicione uma localização...'/>

            <p className='text-guests'>Nº convidados</p>
            <MdOutlinePeople size={30} color='#5F22D9' className='guests-icon'/>
            <input className='input-guests' placeholder='0' type='number'/>
          </div>
          
          <ButtonsBar>
              <Button id="btn-close" color='secondary' onClick={handleClose}>Cancelar</Button>
              <Button color='primary'>Salvar</Button>
            </ButtonsBar>

        </Box>
        
      </Modal>

    </div>
  )
}

export default Events_Activity
