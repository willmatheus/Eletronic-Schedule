import React, { useState } from 'react'
import './task.css'
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


function ShowTask() {
  
  const description = "Lorem ipsum dolor sit amet. Id error maiores eum distinctio dolorum est cumque officiis vel culpa minima et consectetur nisi. Et sint nihil cum voluptate ratione a voluptas dicta et corrupti consequatur ut illo praesentium est amet recusandae aut pariatur iure. Eos earum alias rem cupiditate sequi aut nihil necessitatibus! Non placeat voluptas sit corporis ipsum At deleniti cumque At maiores molestiae eos eligendi dicta et minima assumenda qui expedita mollitia."

  //Puxar do banco a data e o horário
  const [hour, setHour] = React.useState<Dayjs | null>(dayjs('2024-02-19T15:00'));
  const [date, setDate] = React.useState<Dayjs | null>(dayjs('2024-02-19'));

  const [open, setOpen] = React.useState<boolean>(false);

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
      <BoxHeader>
        {/*Status da Tarefa através do checkbox*/}
        <Checkbox aria-label ='Checkbox demo' sx={{ padding : '0px'} }/>

        {/*Título da tarefa em default value*/}
        <Input aria-label="Demo input" placeholder="Título" defaultValue={"Estudar para a prova de redes"} />
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
      <Textarea aria-label="empty textarea" maxRows={7} defaultValue={description} color='primary'/>
      
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
                      Você deseja excluir essa tarefa?
                    </DialogContent>
                    <DialogActions>
                      <Button color="primary" onClick={() => setOpen(false)}>
                        Excluir
                      </Button>
                      {/*Adicionar Onclick para apagar do banco*/}
                      <Button color="secondary">
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

export default ShowTask