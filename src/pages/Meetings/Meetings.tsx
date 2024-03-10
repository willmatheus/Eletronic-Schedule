import React, { FormEvent, useEffect, useRef, useState } from 'react'
import '../pagesStyles.css'
import './meetings.css'
import {MdAdd} from "react-icons/md";
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
import { Card, CardData, CardHead, CardTitle } from '../../components/Cards';
import { api } from '../../services/api';
import ShowMeeting from './ShowMeeting';
import { MeetingsProps } from '../../types/meetings';
import { useModalMeeting } from '../../context/modalMeeting';
import { Snackbar, SnackbarOrigin } from '@mui/material';

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

interface Snack extends SnackbarOrigin {
  open: boolean;
}

function Meetings() {
  const [meetings, setMeetings] = useState<MeetingsProps[]>([])

  const tituloRef = useRef<HTMLInputElement | null> (null)
  const descricaoRef = useRef<HTMLTextAreaElement | null> (null)
  const dataRef = useRef<HTMLInputElement | null> (null)
  const horarioRef = useRef<HTMLInputElement | null> (null)
  const linkRef = useRef<HTMLInputElement | null> (null)
  const pautaRef = useRef<HTMLTextAreaElement | null> (null)


  const [openModal, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { openMeeting, handleOpenMeeting, handleCloseMeeting } = useModalMeeting();

  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2024-02-26T15:30'));

  const [currentActivity, setCurrentActivity] = useState<MeetingsProps>()

  const [snack, setSnack] = useState<Snack>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = snack;
  
  const [message, setMessage] = useState<string>('Preencha o título')
  
  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };
  
  const handleNotify = () =>{
    setSnack({ ...snack, open: true });
  }

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const response = await api.get('/reunioes');
    setMeetings(response.data);
  }

  async function handleSubmit(event:FormEvent){
    event.preventDefault()
  
    if(!tituloRef.current?.value){
      setMessage('Preencha o título!')
      handleCloseSnack()
      handleNotify()
    }else if(!pautaRef.current?.value){
      setMessage('Preencha a pauta')
      handleCloseSnack()
      handleNotify()
    }else if(!linkRef.current?.value){
      setMessage('Preencha o link')
      handleCloseSnack()
      handleNotify()
    }
    else{
      const response =  await api.post('/reunioes', {
        'data': dataRef.current?.value, 
        'titulo': tituloRef.current?.value,
        'horario': horarioRef.current?.value,
        'descricao': descricaoRef.current?.value,
        'link' : linkRef.current?.value,
        'pauta' : pautaRef.current?.value
      });
  
      setMeetings(allMeetings => [...allMeetings, response.data])
      
      setOpen(false)
    }
  }

function handleOpenModal (activityItem : MeetingsProps) {
    setCurrentActivity(activityItem);
    handleOpenMeeting()
} 

  return (
    <div className='container'>
      <div className='title'><h1>Reuniões</h1></div>

      <div className='activities-container'>

        <div className='list-container'>
              {meetings.map((meet : MeetingsProps)=>(
                  <div key={meet.id}>
                      <Card onClick={() => handleOpenModal(meet)}>
                          <CardHead>
                              <CardTitle>{meet.titulo}</CardTitle>
                          </CardHead>
                          <CardData>{meet.data}</CardData>

                      </Card>
                  </div>
              ))}
                  <Modal
                  open={openMeeting}
                  onClose={handleCloseMeeting}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  >
                      <ShowMeeting meet={currentActivity}/>
                  </Modal>
        </div>

      </div>

      <FloatingButton onClick={handleOpen}><MdAdd size={30}/></FloatingButton>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseSnack}
        message={message}
        key={vertical + horizontal}
      />

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit} id='register-task'>
          <Input aria-label="Demo input" placeholder="Título" ref={tituloRef}/>

          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'TimeField']}>
                <MobileDatePicker label="Selecione uma data" slotProps={{ 
                  textField: {size: 'small', color: 'primary'}
                  }} inputRef={dataRef} defaultValue={dayjs('2024-02-26')} format="DD/MM/YYYY"/>
                
                <TimeField ampm={false}
                  label="Selecione um horário"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  slotProps={{ 
                    textField: {size: 'small', color: 'primary'}
                    }} inputRef={horarioRef}
                />
                
              </DemoContainer>
            </LocalizationProvider>
            
          </ThemeProvider>
                      
          <Textarea aria-label="empty textarea" maxRows={7} placeholder='Adicione uma pauta para a reunião...' ref={pautaRef}/>
          <Textarea aria-label="empty textarea" maxRows={7} placeholder="Adicione uma descrição..." ref={descricaoRef}/>
          
          <input className='link-meeting' placeholder='Adicione um link para a reunião...' ref={linkRef}/>
          
          <ButtonsBar>
              <Button id="btn-close" color='secondary' onClick={handleClose}>Cancelar</Button>
              <Button color='primary' type='submit' form="register-task" value="Salvar">Salvar</Button>
            </ButtonsBar>

          </form>
        </Box>
        
      </Modal>

    </div>
  )
}

export default Meetings
