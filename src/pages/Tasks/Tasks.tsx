import { useEffect, useState, FormEvent, useRef, ChangeEvent} from 'react'
import '../pagesStyles.css'
import { MdAdd } from "react-icons/md";
import styled from 'styled-components'

import FloatingButton from '../../components/FloatingButton';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Cards from '../../components/Cards';

import { api } from '../../services/api'
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
import { ModalTaskProvider } from '../../context/modalTask';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import { TransitionProps } from '@mui/material/transitions';

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

function Tasks() {

  const [tasks, setTasks] = useState<TaskProps[]>([])

  const tituloRef = useRef<HTMLInputElement | null> (null)
  const descricaoRef = useRef<HTMLTextAreaElement | null> (null)
  const dataRef = useRef<HTMLInputElement | null> (null)
  const horarioRef = useRef<HTMLInputElement | null> (null)

  const [openModal, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [snack, setSnack] = useState<Snack>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = snack;


  const handleCloseSnack = () => {
    setSnack({ ...snack, open: false });
  };

  useEffect(() => {
    loadTasks();
  }, [tasks]);

  async function loadTasks() {
    const response = await api.get('/tarefas');
    setTasks(response.data);
    //console.log(response.data);
  }

  const handleNotify = () =>{
    setSnack({ ...snack, open: true });
  }

  async function handleSubmit(event:FormEvent){
    event.preventDefault()

    if(!tituloRef.current?.value){
      handleNotify()
    }

    else{
      const response =  await api.post('/tarefas', {
        'data': dataRef.current?.value, 
        'titulo': tituloRef.current?.value,
        'horario': horarioRef.current?.value,
        'descricao': descricaoRef.current?.value
      });
  
      setTasks(allTasks => [...allTasks, response.data])
  
      setOpen(false)
    }
  }

  const [value, setValue] = useState<Dayjs | null>(dayjs('2024-02-26T15:30'));

  return (
    <div className='container'>
      <div className='title'><h1>Tarefas</h1></div>

      <div className='activities-container'>

        <div className='list-container'>
          
          <ModalTaskProvider>
            <Cards activity_name='task' activities={tasks}/>
          </ModalTaskProvider>
        </div>

      </div>

      <FloatingButton onClick={handleOpen}><MdAdd size={30}/></FloatingButton>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseSnack}
        message={"Preencha o título"}
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
              <Input placeholder="Título" ref={tituloRef}/>
              <Textarea aria-label="empty textarea" maxRows={7} placeholder="Adicione uma descrição…" color='primary' ref={descricaoRef}/>
              
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

export default Tasks