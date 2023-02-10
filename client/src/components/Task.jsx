import React from 'react'
import { faEdit, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';


  const handleButton = () =>{
    Swal.fire({
      icon: 'info',
      title: 'Equipo de desarrollo:',
      text: 'Aún estamos trabajando en esto',
      confirmButtonText: 'Ok',
    });
  }
export const Task = () => {
  return (
    <Alert variant="primary">
      <div className="d-flex justify-content-between">
        <h4>Task:</h4>
        <div className='gap-1 d-flex'>
        <Button onClick={handleButton} variant="secondary" className="mr-2">
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button onClick={handleButton} variant="secondary" className="mr-2">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button onClick={handleButton} variant="secondary">
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </div>
      </div>
      <p className="mt-3">Task Name</p>
      <p>Deliver Date</p>
      <p>Priority</p>
    </Alert>
  )
}
