import React, { FormEvent, useRef, useState } from 'react'
import styled from 'styled-components';
import { MdOutlineDelete, MdUploadFile, MdClose } from "react-icons/md";
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
import { TaskProps } from '../../types/tasks';
import { BiTaskX } from 'react-icons/bi';
import { api } from '../../services/api';
import {useModalTask} from '../../context/modalTask'

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
const Upload_styled = styled.input`
  width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
`

const FileDiv = styled.div`
  background-color: #EDE4FF;
  margin: auto;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: fit-content;
`
type ShowTaskProps = {
  task: TaskProps;
}

function ShowTask({task} : ShowTaskProps) {
  
  function formatData(data: string): string {
    const [dia, mes, ano] = data.split('/')
    return `${mes}/${dia}/${ano}`
  }

  const taskData = formatData(task.data)

  const [hour, setHour] = React.useState<Dayjs | null>(dayjs(`2024-02-19T${task.horario}`));
  const [date, setDate] = React.useState<Dayjs | null>(dayjs(taskData));

  const [open, setOpen] = React.useState<boolean>(false);
  const handleCloseDelete = () => setOpen(false)

  const { handleCloseTask } = useModalTask();

  function handleStatus(value){
    if(value == 'pendente') return false
    else return true
  }

  function convertStatus(value){
    if(value) return "concluido"
    else return "pendente"
  }

  const tituloRef = useRef<HTMLInputElement | null> (null)
  const descricaoRef = useRef<HTMLTextAreaElement | null> (null)
  const dataRef = useRef<HTMLInputElement | null> (null)
  const horarioRef = useRef<HTMLInputElement | null> (null)
  const [status, setStatus] = React.useState(handleStatus(task.status));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.checked);
  };

  //Update a task
  async function handleSubmit(event:FormEvent){
    event.preventDefault()

    if(!tituloRef.current?.value || !dataRef.current?.value || !horarioRef.current?.value) return
    
    const statusPut = convertStatus(status)

    try{
      const response =  await api.put(`/tarefas/${task.id}`, {
    "data": dataRef.current?.value, 
    "titulo": tituloRef.current?.value,
    "horario": horarioRef.current?.value,
    "descricao": descricaoRef.current?.value,
    "status": statusPut
    });
    }catch(err){
      console.log(err)
    }

    handleCloseTask()
  }

  async function handleRemove() {
    
    try{
      await api.delete(`/tarefas/${task.id}`)
    }catch(err){
      console.log(err)
    }
    handleCloseDelete()
    handleCloseTask()
  }

  //const [file, setFile] = useState<File | null>(null);

  /*
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  */

  return (
      <Sheet sx={style}>
        {/*Tela de visualizar Card/ Alterar tarefa*/}
        <form onSubmit={handleSubmit} id='edit-task'>
          <BoxHeader>
            {/*Status da Tarefa através do checkbox*/}
            <Checkbox
            checked={status}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            />

            <Input aria-label="Demo input" placeholder="Título" defaultValue={task.titulo} ref={tituloRef}/>
            <ModalClose variant="plain" sx={{ m: 1 }} />
          </BoxHeader>

          <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'TimeField']}>
                    <MobileDatePicker label="Selecione uma data" slotProps={{ 
                      textField: {size: 'small', color: 'primary'}
                      }} value={date}
                      onChange={(newValue) => setDate(newValue)} inputRef={dataRef} format="DD/MM/YYYY"/>
                    
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
          
          <Textarea aria-label="empty textarea" maxRows={7} defaultValue={task.descricao} 
          color='primary' ref={descricaoRef}/>
          
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
                          Você deseja excluir essa tarefa?
                        </DialogContent>
                        <DialogActions>
                          {/*Adicionar Onclick para apagar do banco*/}
                          <Button color="primary" onClick={() => handleRemove()}>
                            Excluir
                          </Button>
                          <Button color="secondary"  onClick={() => setOpen(false)}>
                            Cancelar
                          </Button>
                        </DialogActions>
                    </ModalDialog>
                  </Modal>
                  
                </IconsOptions>
                <ButtonSaveContainer>
                    {/*Botão Salvar*/}
                    <Button color='primary' type='submit' form="edit-task" >Salvar</Button>

                </ButtonSaveContainer>
          </ButtonsBar>
      </Sheet>
  )
}

export default ShowTask