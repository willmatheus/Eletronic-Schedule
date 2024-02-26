import React from 'react'
import { ModalEventProvider } from '../../context/modalEvent'
import Events_Activity from './Events_Activity'

function EventManager() {
  return (
    <ModalEventProvider>
        <Events_Activity/>
    </ModalEventProvider>
  )
}

export default EventManager