import React, { useEffect } from 'react'

import { Link, useParams } from 'react-router-dom';
import { AlertMsg } from '../components/AlertMsg';
import { useProjects } from '../hooks/useProjects';

import { Task } from '../components/Task';
import { Alert, Button, Container } from 'react-bootstrap';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

export const Project = () => {

 const {id} = useParams();

  const {loading,alert,getProject,project,deleteProject}= useProjects()

  const {name,description,dataExpire,client,_id} = project

  useEffect(() => {

    getProject(id)
  
  }, [id])

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure to delete this project?',
      showCancelButton: true,
      confirmButtonColor : 'red',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(id)
      } 
    })
  }
  
  if(alert.msg) return <AlertMsg {...alert}/>
  return (
    <>
      <>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
          <Container
            style={{
              backgroundColor: "rgba(000, 000, 000, 0.7)",
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <div className="d-flex justify-content-between">
              <h1 className="text-white"> {name} </h1>
              <div className="gap-1 d-flex">
                <Link to={`/projects/edit-project/${id}`}>
                  <Button variant="outline-light" className="mr-2">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </Link>
                <Link to={"#"} onClick={handleDelete}>
                  <Button variant="outline-light" className="mr-2">
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Link>
              </div>
            </div>
            <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.7",marginTop:'4px' }} />
            <div className='text-muted mt-2'><span className='text-white'>Description :</span> {description}</div>
            <div className='mt-2'><Task /></div>
            
          </Container>
          
          </>
        )}
      </>
    </>
  );
}
