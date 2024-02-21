import React from 'react'
import '../pagesStyles.css'
import { MdAddTask } from "react-icons/md";
import styled from 'styled-components'

import FloatingButton from '../../components/FloatingButton';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Cards from '../../components/Cards';

import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import { TaskProps } from '../../types/tasks'

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

function Tarefas() {

  const [tasks, setTasks] = useState<TaskProps[]>([])

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get('/tarefas');
    setTasks(response.data);
    console.log(response.data);
  }


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  return (
    <div className='container'>
      <div className='title'><h1>Tarefas</h1></div>

      <div className='activities-container'>

        <div className='filter-container'>
          <button className='btn-filter'><h3>Todas as tarefas</h3></button>
          <button className='btn-filter active'><h3>Minhas tarefas</h3></button>
          <button className='btn-filter'><h3>Tarefas Convidadas</h3></button>
        </div>

        <div className='list-container'>
            <Cards activity_name='task' activity={tasks}/>
        </div>

      </div>

      <FloatingButton onClick={handleOpen}><MdAddTask size={30}/></FloatingButton>

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
          
          <ButtonsBar>
              <Button id="btn-close" color='secondary' onClick={handleClose}>Cancelar</Button>
              <Button color='primary'>Salvar</Button>
            </ButtonsBar>

        </Box>
        
      </Modal>

    </div>
  )
}

export default Tarefas
