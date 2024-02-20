import React, { useState } from 'react'
import './meetings.css'
import styled from 'styled-components';
import { MdOutlineDelete, MdLocationOn, MdOutlinePeople} from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
//import { FaRegFileAlt } from "react-icons/fa";

import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Button from '../../components/Button';

import { ModalClose, Modal} from '@mui/joy';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { ptBR } from '@mui/x-date-pickers/locales';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs, { Dayjs } from 'dayjs';
import { Sheet } from '@mui/joy';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import ModalDialog from '@mui/joy/ModalDialog';

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

const ButtonSaveContainer = styled.div`
    position:absolute; 
    right:32px;
  `

const BoxHeader = styled.div`
  display: flex;
  padding: 0px;
`
const ButtonsBar = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 10px;
`

const IconsOptions = styled.div`
  display: flex;
  float: left;
`

const Delete_styled = styled.button`
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;
  margin-right: 5px;
  padding-bottom: 3px;
`

function ShowMeeting() {
    
  const description = "Lorem ipsum dolor sit amet. Id error maiores eum distinctio dolorum est cumque officiis vel culpa minima et consectetur nisi. Et sint nihil cum voluptate ratione a voluptas dicta et corrupti consequatur ut illo praesentium est amet recusandae aut pariatur iure. Eos earum alias rem cupiditate sequi aut nihil necessitatibus! Non placeat voluptas sit corporis ipsum At deleniti cumque At maiores molestiae eos eligendi dicta et minima assumenda qui expedita mollitia."

  //Puxar do banco a data e o horário
  const [hour, setHour] = useState<Dayjs | null>(dayjs('2024-02-19T15:00'));
  const [date, setDate] = useState<Dayjs | null>(dayjs('2024-02-19'));

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet sx={style}>
      {/*Tela de visualizar Card/ Alterar tarefa*/}
      <BoxHeader>

        {/*Título da tarefa em default value*/}
        <Input aria-label="Demo input" placeholder="Título" defaultValue={"Festa de natal na minha casa"} />
        <ModalClose variant="plain" sx={{ m: 1 }} />
      </BoxHeader>

      <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'TimeField']}>
                {/*Data da tarefa em value*/}
                <MobileDatePicker label="Selecione uma data" slotProps={{ 
                  textField: {size: 'small', color: 'primary'}
                  }} value={date}
                  onChange={(newValue) => setDate(newValue)}/>
                
                {/*Hora da tarefa em value*/}
                <TimeField
                  label="Selecione um horário"
                  value={hour}
                  onChange={(newValue) => setHour(newValue)}
                  slotProps={{ 
                    textField: {size: 'small', color: 'primary'}
                    }}
                />
                
              </DemoContainer>
            </LocalizationProvider>
      </ThemeProvider>
      
      {/*Texto da descrição, mudar o campo default value*/}
      <Textarea aria-label="empty textarea" maxRows={7} defaultValue={'Daily Scrum'} color='primary' placeholder='Adicione uma pauta para a reunião...'/>
      <Textarea aria-label="empty textarea" maxRows={7} defaultValue={description} color='primary' placeholder='Adicione uma descrição...'/>
      
      <input className='link-meeting' placeholder='Adicione um link para a reunião...' value={'https://meet.google.com/kdc-yuxc-ydm'}/>
      {/*file && (
        <FileDiv>
            <FaRegFileAlt size={30}/>
            <p>{file.name}</p>
            <MdClose />
        </FileDiv>
      )*/}

      {/*Barra de botões no fim da janela*/}
      <ButtonsBar>
            <IconsOptions>

              {/*Botão Lixeira e Adicionar Arquivo, adicionar onClick no Icon_styled*/}
              <Delete_styled onClick={() => setOpen(true)}><MdOutlineDelete color='black' size={30}/></Delete_styled>

              {/*
              <label htmlFor="file" className="sr-only"><MdUploadFile color='black' size={29}/></label>
              <Upload_styled id='file' type='file' onChange={handleFileChange}></Upload_styled>
              */}
              <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                      <RiErrorWarningLine size={24} color='red'/>
                      Atenção
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                      Você deseja excluir esse evento?
                    </DialogContent>
                    <DialogActions>
                      <Button color="primary">
                        Excluir
                      </Button>
                      {/*Adicionar Onclick para apagar do banco*/}
                      <Button color="secondary"  onClick={() => setOpen(false)}>
                        Cancelar
                      </Button>
                    </DialogActions>
                </ModalDialog>
              </Modal>
              
            </IconsOptions>
            <ButtonSaveContainer>

                {/*Botão Salvar*/}
                <Button color='primary'>Salvar</Button>

            </ButtonSaveContainer>
      </ButtonsBar>

    </Sheet>
  )
}

export default ShowMeeting