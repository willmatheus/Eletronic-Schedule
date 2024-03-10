import React, { FormEvent, useRef, useState } from 'react'
import './events_activity.css'
import styled from 'styled-components';
import { MdOutlineDelete, MdLocationOn, MdOutlinePeople} from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
//import { FaRegFileAlt } from "react-icons/fa";

import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Button from '../../components/Button';

import { Checkbox, TextField } from '@mui/material';
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

type ShowEventProps = {
  event: EventsProps;
}

function ShowEvent({event} : ShowEventProps) {
  function formatData(data: string): string {
    const [dia, mes, ano] = data.split('/')
    return `${mes}/${dia}/${ano}`
  }

  const eventData = formatData(event.data)

  const [hour, setHour] = React.useState<Dayjs | null>(dayjs(`2024-02-19T${event.horario}`));
  const [date, setDate] = React.useState<Dayjs | null>(dayjs(eventData));

  const [open, setOpen] = React.useState<boolean>(false);
  const handleCloseDelete = () => setOpen(false)

  const { handleCloseEvent } = useModalEvent();

  const tituloRef = useRef<HTMLInputElement | null> (null)
  const descricaoRef = useRef<HTMLTextAreaElement | null> (null)
  const dataRef = useRef<HTMLInputElement | null> (null)
  const horarioRef = useRef<HTMLInputElement | null> (null)
  const localRef = useRef<HTMLInputElement | null> (null)
  const numeroDeConvidadosRef = useRef<HTMLInputElement | null> (null)

  async function handleSubmit(e:FormEvent){
    e.preventDefault()

    if(!tituloRef.current?.value || !dataRef.current?.value || !horarioRef.current?.value || 
      !localRef.current?.value) return
    
    const nConvidados = parseInt(numeroDeConvidadosRef.current?.value, 10);

    try{
      const response =  await api.put(`/eventos/${event.id}`, {
        "data": dataRef.current?.value, 
        "titulo": tituloRef.current?.value,
        "horario": horarioRef.current?.value,
        "descricao": descricaoRef.current?.value,
        "local": localRef.current?.value,
        "numeroDeConvidados": nConvidados
      });
    }catch(err){
      console.log(err)
    }

    handleCloseEvent()
  }

  async function handleRemove() {
    
    try{
      await api.delete(`/eventos/${event.id}`)
    }catch(err){
      console.log(err)
    }
    handleCloseDelete()
    handleCloseEvent()
  }

  return (
    <Sheet sx={style}>

      <form onSubmit={handleSubmit} id='edit-event'>
        {/*Tela de visualizar Card/ Alterar tarefa*/}
        <BoxHeader>

          {/*Título da tarefa em default value*/}
          <Input aria-label="Demo input" placeholder="Título" defaultValue={event.titulo} ref={tituloRef}/>
        </BoxHeader>

        <div className='location-container'>
              <MdLocationOn size={30} color='#5F22D9' className='location-icon'/>
              <input className='location-description' placeholder='Adicione uma localização...' defaultValue={event.local} ref={localRef}/>

              <p className='text-guests'>Nº convidados</p>
              <MdOutlinePeople size={30} color='#5F22D9' className='guests-icon'/>
              <input className='input-guests' placeholder='0' type='number' defaultValue={event.numeroDeConvidados} ref={numeroDeConvidadosRef}/>
        </div>

        <ThemeProvider theme={theme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'TimeField']}>
                  {/*Data da tarefa em value*/}
                  <MobileDatePicker label="Selecione uma data" slotProps={{ 
                    textField: {size: 'small', color: 'primary'}
                    }} value={date}
                    onChange={(newValue) => setDate(newValue)} inputRef={dataRef} format="DD/MM/YYYY"/>
                  
                  {/*Hora da tarefa em value*/}
                  <TimeField ampm={false}
                    label="Selecione um horário"
                    value={hour}
                    onChange={(newValue) => setHour(newValue)}
                    slotProps={{ 
                      textField: {size: 'small', color: 'primary'}
                      }} inputRef={horarioRef}
                  />
                  
                </DemoContainer>
              </LocalizationProvider>
        </ThemeProvider>
        
        {/*Texto da descrição, mudar o campo default value*/}
        <Textarea aria-label="empty textarea" maxRows={7} defaultValue={event.descricao} ref={descricaoRef} color='primary'/>
        
        {/*file && (
          <FileDiv>
              <FaRegFileAlt size={30}/>
              <p>{file.name}</p>
              <MdClose />
          </FileDiv>
        )*/}

      </form>

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
                      <Button color="primary" onClick={() => handleRemove()}>
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

                <Button color='secondary' onClick={() => handleCloseEvent()}>Cancelar</Button>
                <Button color='primary' type='submit' form="edit-event">Salvar</Button>

            </ButtonSaveContainer>
      </ButtonsBar>

    </Sheet>
  )
}

export default ShowEvent