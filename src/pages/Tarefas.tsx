import React from 'react'
import './pagesStyles.css'
import { MdAddTask } from "react-icons/md";
import styled from 'styled-components'
import { styled as mui_styled} from '@mui/system';

import Box from '@mui/material/Box';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Input as BaseInput, InputProps } from '@mui/base/Input';
import Modal from '@mui/material/Modal';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputElement = mui_styled('input')(
  ({ theme }) => `
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: normal;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  outline: none;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 0px;

  &:hover {
    outline: none;
  }

  &:focus {
    outline: none;
  }
`,
);

const Textarea = mui_styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  maxRows = 5;
  border-radius: 8px 8px 0 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };

  &:hover {
    outline: none;
  }

  &:focus {
    outline: none;
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const Input = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <BaseInput slots={ 
  {input: InputElement}} {...props} ref={ref} />;
});

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

const date_style = {
  lineHeight: '10px',
};

const Button = styled.button`
    display: block;
    position: fixed;
    bottom: 30px;
    right: 40px;
    z-index: 9999;
    border: none;
    outline: none;
    background-color: #5F22D9;
    color: white;
    cursor: pointer;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
`
const DateBar = styled.div`

`

function Tarefas() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='container'>
      <div className='title'><h1>Tarefas</h1></div>

      <div className='filter-container'>
        <button className='btn-filter'><h3>Todas as tarefas</h3></button>
        <button className='btn-filter active'><h3>Minhas tarefas</h3></button>
        <button className='btn-filter'><h3>Tarefas Convidadas</h3></button>
      </div>

      <div className='list-tasks'>
          {/*Cards*/}
      </div>

      <Button onClick={handleOpen}><MdAddTask size={30}/></Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Input aria-label="Demo input" placeholder="Título" />
          <Textarea aria-label="empty textarea" maxRows={7} placeholder="Adicione uma descrição…" />
          <DateBar>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={date_style}>
                  <DatePicker label="Escolha uma data"/>
                </DemoContainer>
              </LocalizationProvider>
          </DateBar>
        </Box>
      </Modal>

    </div>
  )
}

export default Tarefas