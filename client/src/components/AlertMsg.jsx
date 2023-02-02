import React from 'react'
import {Alert} from 'react-bootstrap';

export const AlertMsg = ({msg}) => {
  return (
   <Alert
   variant='danger'
   >
    {msg}
   </Alert>
  )
}
