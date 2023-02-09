import React from 'react'
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export const ProjectPreview = ({name,_id,client}) => {

  return (
    <>
     <Alert>
      <Alert.Heading> {name} <span className='text-muted' style={{fontSize:'17px',fontWeight:'normal'}}>  | {client} </span> </Alert.Heading>
      <Link 
      to={`/projects/${_id}`}
      style={{fontWeight:'bold'}}
      >Ver proyecto</Link>
      
    </Alert>
    
    </>
   
  );
}
