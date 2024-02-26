import React, { FormEvent, useRef, useState } from 'react'
import './meetings.css'
import styled from 'styled-components';
import { MdOutlineDelete} from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";

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
import { MeetingsProps } from '../../types/meetings';
import { useModalMeeting } from '../../context/modalMeeting';
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

type ShowMeetingProps = {
  meet: MeetingsProps;
}

function ShowMeeting({meet} : ShowMeetingProps) {
    
  const description = "Lorem ipsum dolor sit amet. Id error maiores eum distinctio dolorum est cumque officiis vel culpa minima et consectetur nisi. Et sint nihil cum voluptate ratione a voluptas dicta et corrupti consequatur ut illo praesentium est amet recusandae aut pariatur iure. Eos earum alias rem cupiditate sequi aut nihil necessitatibus! Non placeat voluptas sit corporis ipsum At deleniti cumque At maiores molestiae eos eligendi dicta et minima assumenda qui expedita mollitia."

  const [hour, setHour] = React.useState<Dayjs | null>(dayjs(`2024-02-19T${meet.horario}`));
  const [date, setDate] = React.useState<Dayjs | null>(dayjs(meet.data));

  const [open, setOpen] = useState<boolean>(false);
  const handleCloseDelete = () => setOpen(false)

  const { handleCloseMeeting } = useModalMeeting();

  const tituloRef = useRef<HTMLInputElement | null> (null)
  const descricaoRef = useRef<HTMLTextAreaElement | null> (null)
  const dataRef = useRef<HTMLInputElement | null> (null)
  const horarioRef = useRef<HTMLInputElement | null> (null)
  const linkRef = useRef<HTMLInputElement | null> (null)
  const pautaRef = useRef<HTMLTextAreaElement | null> (null)

  async function handleSubmit(event:FormEvent){
    event.preventDefault()

    if(!tituloRef.current?.value || !dataRef.current?.value || !horarioRef.current?.value || 
      !linkRef.current?.value || !pautaRef.current?.value) return

    try{
      const response =  await api.put(`/reunioes/${meet.id}`, {
        "data": dataRef.current?.value, 
        "titulo": tituloRef.current?.value,
        "horario": horarioRef.current?.value,
        "descricao": descricaoRef.current?.value,
        "link": linkRef.current?.value,
        "pauta": pautaRef.current?.value
      });
    }catch(err){
      console.log(err)
    }

    handleCloseMeeting()
  }

  async function handleRemove() {
    
    try{
      await api.delete(`/reunioes/${meet.id}`)
    }catch(err){
      console.log(err)
    }
    handleCloseDelete()
    handleCloseMeeting()
  }

  return (
    <Sheet sx={style}>
      <form onSubmit={handleSubmit} id='edit-meet'>
        {/*Tela de visualizar Card/ Alterar tarefa*/}
        <BoxHeader>

          {/*Título da tarefa em default value*/}
          <Input aria-label="Demo input" placeholder="Título" defaultValue={meet.titulo} ref={tituloRef}/>
        </BoxHeader>

        <ThemeProvider theme={theme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'TimeField']}>
                  {/*Data da tarefa em value*/}
                  <MobileDatePicker label="Selecione uma data" slotProps={{ 
                    textField: {size: 'small', color: 'primary'}
                    }} value={date}
                    onChange={(newValue) => setDate(newValue)} inputRef={dataRef}/>
                  
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
        <Textarea aria-label="empty textarea" maxRows={7} defaultValue={meet.pauta} color='primary' placeholder='Adicione uma pauta para a reunião...' ref={pautaRef}/>
        <Textarea aria-label="empty textarea" maxRows={7} defaultValue={meet.descricao} color='primary' placeholder='Adicione uma descrição...' ref={descricaoRef}/>
        
        <input className='link-meeting' placeholder='Adicione um link para a reunião...' value={meet.link} ref={linkRef}/>
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

                  {/*Botão Salvar*/}
                  <Button color='secondary' onClick={() => handleCloseMeeting()}>Cancelar</Button>
                  <Button color='primary' type='submit' form="edit-meet">Salvar</Button>

              </ButtonSaveContainer>
        </ButtonsBar>
    </Sheet>
  )
}

export default ShowMeeting