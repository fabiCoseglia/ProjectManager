import React, { useEffect } from 'react'
import { Alert, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ProjectPreview } from '../components/ProjectPreview'
import { useProjects } from '../hooks/useProjects'

export const Projects = () => {
  const {loading, alert, projects, getProjects} = useProjects();

  useEffect(() => {
    getProjects()
  }, []);

  return (
    <Container    
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid gray',
    borderRadius: '10px',
    padding: '20px'}}
    className='mt-5'
    >
    
       <h1 className='text-white text-center mb-2 fw-bold' style={{fontSize:'32px'}}>Your Projects</h1>
       {
        loading 
        ?
        <p>Cargando...</p>
        :
        projects.length
        ?
        projects.map(project => <ProjectPreview key={project._id}  {...project}/>)
        :
        <Alert variant='warning'><p className='text-center'>You don't have projects!</p> <Link style={{color:'gray',fontWeight:'bold'}} to={'/projects/create-project'}><p className='text-center weight-bold '>Create your first project</p></Link></Alert>
       }
       
      
    </Container>
  )
}
