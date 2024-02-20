import React from 'react'
import { Calendar } from "./Calendar";
import { EventsProvider } from "./Events";
import "./styles.css";

function CalendarManager() {
  return (
    <EventsProvider>
      <Calendar />
    </EventsProvider>
  )
}

export default CalendarManager