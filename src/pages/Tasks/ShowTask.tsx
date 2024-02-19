import React from 'react'
import styled from 'styled-components';
import { MdOutlineDelete, MdUploadFile } from "react-icons/md";

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
`

const IconsOptions = styled.div`
  display: flex;
  float: left;
`

function ShowTask() {
  
  const description = "Lorem ipsum dolor sit amet. Id error maiores eum distinctio dolorum est cumque officiis vel culpa minima et consectetur nisi. Et sint nihil cum voluptate ratione a voluptas dicta et corrupti consequatur ut illo praesentium est amet recusandae aut pariatur iure. Eos earum alias rem cupiditate sequi aut nihil necessitatibus! Non placeat voluptas sit corporis ipsum At deleniti cumque At maiores molestiae eos eligendi dicta et minima assumenda qui expedita mollitia."

  //Puxar do banco a data e o horário
  const [hour, setHour] = React.useState<Dayjs | null>(dayjs('2024-02-19T15:00'));
  const [date, setDate] = React.useState<Dayjs | null>(dayjs('2024-02-19'));

  return (
    <Sheet sx={style}>
      <BoxHeader>
        <Checkbox aria-label ='Checkbox demo' sx={{ padding : '0px'} }/>
        <Input aria-label="Demo input" placeholder="Título" defaultValue={"Estudar para a prova de redes"} />
        <ModalClose variant="plain" sx={{ m: 1 }} />
      </BoxHeader>

      <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'TimeField']}>
                <MobileDatePicker label="Selecione uma data" slotProps={{ 
                  textField: {size: 'small', color: 'primary'}
                  }} value={date}
                  onChange={(newValue) => setDate(newValue)}/>
                
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

      <Textarea aria-label="empty textarea" maxRows={7} defaultValue={description} color='primary'/>
      
      <ButtonsBar>
        <IconsOptions>
          <button><MdOutlineDelete size={30}/></button>
          <button><MdUploadFile  size={30}/></button>
        </IconsOptions>
        <ButtonSaveContainer>
            <Button color='primary'>Salvar</Button>
        </ButtonSaveContainer>
      </ButtonsBar>

    </Sheet>
  )
}

export default ShowTask