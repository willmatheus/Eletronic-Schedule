import React from 'react'
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
import Cards from '../../components/Cards';

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

function Meetings() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  return (
    <div className='container'>
      <div className='title'><h1>Reuniões</h1></div>

      <div className='activities-container'>

        <div className='list-container'>
            <Cards activity_name='meeting' activities={[]}/>
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
                      
          <Textarea aria-label="empty textarea" maxRows={7} placeholder='Adicione uma pauta para a reunião...'/>
          <Textarea aria-label="empty textarea" maxRows={7} placeholder="Adicione uma descrição..."/>
          
          <input className='link-meeting' placeholder='Adicione um link para a reunião...'/>
          
          <ButtonsBar>
              <Button id="btn-close" color='secondary' onClick={handleClose}>Cancelar</Button>
              <Button color='primary'>Salvar</Button>
            </ButtonsBar>

        </Box>
        
      </Modal>

    </div>
  )
}

export default Meetings
