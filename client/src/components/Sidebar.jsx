import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (

    <Alert variant='primary' className='d-flex flex-column align-items-center justify-content-center'>
      <Alert.Heading>Welcome Username! </Alert.Heading>
      <Link to="create-project"><Button variant='primary'>New Project</Button></Link>
    </Alert>

  )
}
