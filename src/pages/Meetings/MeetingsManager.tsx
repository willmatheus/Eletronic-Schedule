import React from 'react'
import { ModalMeetingProvider } from '../../context/modalMeeting'
import Meetings from './Meetings'

function MeetingsManager() {
  return (
    <ModalMeetingProvider>
        <Meetings/>
    </ModalMeetingProvider>
  )
}

export default MeetingsManager