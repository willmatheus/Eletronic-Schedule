import { TbCalendarTime, TbCalendar, } from  'react-icons/tb'
import { BiParty } from "react-icons/bi";
import { MdOutlineVideoCameraFront } from "react-icons/md";
import { FaTasks } from "react-icons/fa";

const side_bar_pages = [
    {
        title: "Agenda Semanal",
        path: "/",
        icon: <TbCalendarTime/>
    },
    {
        title: "Calendário",
        path: "/calendario",
        icon: <TbCalendar/>
    },
    {
        title: "Tarefas",
        path: "/tarefas",
        icon: <FaTasks/>
    },
    {
        title: "Eventos",
        path: "/eventos",
        icon: <BiParty/>
    },
    {
        title: "Reuniões",
        path: "/reunioes",
        icon: <MdOutlineVideoCameraFront/>
    },
  ]

  export default side_bar_pages